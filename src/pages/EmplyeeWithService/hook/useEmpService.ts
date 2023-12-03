import React from "react";
import { useForm } from "react-hook-form";
import { EmpServicINput } from "../../../API/Emplyee/type";
import { useParams } from "react-router";
import EmployeeQureis from "../../../API/Emplyee/EmployeeQureis";
import { ServiceQueries } from "../../../API/Service/ServiceQueries";
import { showError, showSuccess } from "../../../libs/reactToastify";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const useEmpService = () => {
  const [open, setOpen] = React.useState(false);
  const {
    control,
    handleSubmit,
    watch,
    reset,
  } = useForm<EmpServicINput>();
  const { salonId } = useParams();
  const { empId } = useParams();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { data: ServOption } =
    ServiceQueries.GetServiceDetailsAutoCompleteQuery(salonId!);
  const { mutate, isPending } = EmployeeQureis.SetEmpServiceQuery();
  const onSubmit = () => {
    mutate(
      {
        employeeId: empId!,
        services: watch("services").map((d) => d.id),
      },
      {
        onSuccess: () => {
          setOpen(false);
          queryClient.refetchQueries({ queryKey: ["get-emp-service-details"] });
          showSuccess(t("serv.action"));
          reset({services : []})
        },
        onError(error: any) {
          showError(error.response.data.errorMessage);
        },
      }
    );
  };
  return {
    open,
    mutate,
    isPending,
    onSubmit,
    handleSubmit,
    setOpen,
    control,
    watch,
    ServOption,
  };
};
export default useEmpService;
