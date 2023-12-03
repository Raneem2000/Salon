import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useTranslation } from "react-i18next";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/material";
import useCpMngment from "./hook/useCpMngment";
import FormTextField from "../../Components/Form/FormTextField";
import GenericObjectAutoComplete from "../../Components/Form/GenericObjectAutoComplete";
import FormPasswordInput from "../../Components/Form/FormPasswordInput";
import SubmitButton from "../../Components/Form/SubmitButton";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Controller } from "react-hook-form";
import Loading from "../../Components/Loading";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
})
const AddUser: React.FC<{
  id?: string;
  setId?: (id: string) => void;
}> = ({ id, setId }) => {
  const {
    control,
    handleSubmit,
    onSubmit,
    roleOption,
    register,
    open,
    setOpen,
    isPending,
    watch,
    isLoading,
  } = useCpMngment(id!);
  const { t } = useTranslation();
  // console.log(userDetails);
  return (
    <React.Fragment>
      <Stack
        flexDirection="row"
        justifyContent="end"
        marginInline={`${id ? "0" : "50px"}`}
      >
        {id ? (
          <IconButton>
            <EditIcon
              onClick={() => {
                setOpen(true);
                setId?.(id);
              }}
              color="primary"
            />
          </IconButton>
        ) : (
          <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
            <AddIcon className="text-white-100" />
          </Fab>
        )}
      </Stack>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        fullWidth
        aria-describedby="alert-dialog-slide-description"
        sx={{ textAlign: "center" }}
      >
        <DialogTitle>
          {id ? t("cpMangment.edit") : t("cpMangment.add")}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isLoading ? (
            <Loading />
          ) : (
            <DialogContent>
              <Stack flexDirection="column" spacing={5} padding="15px">
                <FormTextField
                  control={control}
                  name="username"
                  label={t("form.userName")}
                  req
                  shrink
                />
                <FormPasswordInput register={register} req={!watch("userId")} />
                <Controller
                  name="roles"
                  control={control}
                  render={({ field }) => (
                    <GenericObjectAutoComplete
                      value={field.value}
                      onChange={field.onChange}
                      option={roleOption!}
                      label={t("form.ChooseRole")}
                      required
                    />
                  )}
                />
              </Stack>
            </DialogContent>
          )}
          <DialogActions>
            <SubmitButton isSubmitting={isPending} />
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
export default AddUser;
