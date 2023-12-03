import { FC, useState } from "react";
import { showError, showSuccess } from "../../libs/toast/Tostify";
import DeleteModal from "../../Components/DeleteModal";
import EmployeeQureis from "../../API/Emplyee/EmployeeQureis";
import { useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const DeleteEmpService: FC<{ id: string }> = ({ id }) => {
  const [Open, setOpen] = useState<boolean>(false);
  const { mutate, isPending } = EmployeeQureis.DeleteEmpService();
  const { empId } = useParams();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const deleteHandler = () => {
    mutate(
      {
        EmployeeId: empId!,
        ServiceId: id,
      },
      {
        onSuccess: () => {
          setOpen(false);
          queryClient.refetchQueries({ queryKey: ["get-emp-service-details"] });
          showSuccess(t("serv.delete"));
        },
        onError(error: any) {
          showError(error.response.data.errorMessage);
        },
      }
    );
  };

  return (
    <>
      <DeleteModal
        Open={Open}
        deleteFn={deleteHandler}
        setOpen={setOpen}
        isLoading={isPending}
      />
    </>
  );
};

export default DeleteEmpService;
