import { Box, Grid, Paper, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { PermissionQueries } from "../../API/Permission/PermissionQueries";
import TitleWithArrow from "../../Components/TitleWithArrwo";
import CheckContnt from "./CheckContnt";
import { IPermissionGet } from "../../API/Permission/type";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { showError, showSuccess } from "../../libs/reactToastify";
import SubmitButton from "../../Components/Form/SubmitButton";
import NoData from "../../Components/NoData";
import Loading from "../../Components/Loading";

const EditRole = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { roleId } = useParams();
  const { register, control, watch, handleSubmit, setValue, getValues } =
    useForm<IPermissionGet>();
  const { data: roleDetails, isLoading } =
    PermissionQueries.GetContentsByRoleIdQuery(roleId!);
  const { mutate, isPending } = PermissionQueries.SetPermissionQuery();
  const submitHandler = (_data: IPermissionGet) => {
    setValue("roleId", roleDetails?.roleId!);
    setValue("roleName", roleDetails?.roleName!);
    console.log(getValues(), "getValues");

    mutate(getValues(), {
      onSuccess: () => {
        showSuccess(t("permission.added"));
        navigate(-1);
      },
      onError: () => showError(t("permission.wrong")),
    });
  };

  useEffect(() => {
    if (roleDetails) {
      setValue("roleId", roleDetails?.roleId);
      setValue("roleName", roleDetails?.roleName);
      setValue("contents", roleDetails?.contents);
    }
  }, [roleDetails, setValue]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            paddingInline: "40px",
            marginTop: "30px",
          }}
        >
          <TitleWithArrow title={t("permission.edit")} />
          {roleDetails?.contents.length === 0 ? (
            <NoData />
          ) : (
            <Paper sx={{ py: 1, px: 4, mt: 5 }} elevation={5}>
              <form onSubmit={handleSubmit(submitHandler)}>
                <Grid container sx={{ marginInlineStart: 3 }}>
                  {roleDetails?.contents.map((d, index) => (
                    <Grid item key={d.id} xs={12} md={6} lg={4} xl={3}>
                      <CheckContnt
                        register={register}
                        content={d}
                        control={control}
                        setValue={setValue}
                        index={index}
                        watch={watch}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Stack
                  marginInline={`auto`}
                  justifyContent={`center`}
                  width={`fit-content`}
                  marginY={`15px`}
                >
                  <SubmitButton isSubmitting={isPending} />
                </Stack>
              </form>
            </Paper>
          )}
        </Box>
      )}
    </>
  );
};
export default EditRole;
