import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SetUserType } from "../../../API/CpManagement/type";
import { CpManagementQueries } from "../../../API/CpManagement/CpManagementQueries";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "../../../libs/toast/Tostify";
import { useTranslation } from "react-i18next";
const useCpMngment = (id: string) => {
  const {
    control,
    handleSubmit,
    setValue,
    register,
    watch,
    clearErrors,
    reset,
  } = useForm<SetUserType>();
  const { data: userDetails, isLoading } =
    CpManagementQueries.GetUserByIdQuery(id);
  //   console.log(userDetails)
  const [open, setOpen] = React.useState(false);
  const { isPending, mutate, isSuccess } = CpManagementQueries.SetUserQuery();
  const { data: roleOption } = CpManagementQueries.GetRoles();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  useEffect(() => {
    if (typeof userDetails !== undefined) {
      setValue("username", userDetails?.username!);
      setValue(
        "roles",
        roleOption?.find((r) => r.name === userDetails?.role)
      );
      setValue("userId", userDetails?.id);
      clearErrors("password");
    }
  }, [userDetails, roleOption]);
  const onSubmit = () => {
    mutate(
      {
        userId: watch("userId") ?? undefined,
        username: watch("username"),
        password: watch("password"),
        roleId: watch("roles.id"),
      },
      {
        onSuccess: () => {
          setOpen(false);
          if (!watch("userId")) {
            reset({
              password: "",
              username: "",
            });
          }
          queryClient.refetchQueries({ queryKey: ["get-users"] });
          showSuccess(t("cpMangment.action"));
        },
        onError(errorMessage: any) {
          showError(errorMessage);
        },
      }
    );
  };
  return {
    control,
    setValue,
    open,
    watch,
    setOpen,
    onSubmit,
    handleSubmit,
    isPending,
    roleOption,
    register,
    isSuccess,
    userDetails,
    isLoading,
    id,
  };
};
export default useCpMngment;
