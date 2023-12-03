import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useTranslation } from "react-i18next";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/material";
import SubmitButton from "../../Components/Form/SubmitButton";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Controller } from "react-hook-form";
import useEmpService from "./hook/useEmpService";
import GenericAutoCompleteMultipule from "../../Components/Form/GenericAutoCompleteMultipule";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddEmployeeService: React.FC<{
  id?: string;
  setId?: (id: string) => void;
}> = ({ id, setId }) => {
  const {
    open,
    setOpen,
    control,
    ServOption,
    handleSubmit,
    onSubmit,
    isPending,
  } = useEmpService();
  // console.log(ServOption);
  const { t } = useTranslation();
  return (
    <>
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
            {id ? t("serv.edit") : t("serv.add")}
          </DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <Stack flexDirection="column" spacing={5} padding="15px">
                <Controller
                  name="services"
                  control={control}
                  render={({ field }) => (
                    <GenericAutoCompleteMultipule
                      option={ServOption}
                      value={field.value}
                      onChange={field.onChange}
                      label={t("form.chooseService")}
                      required={true}
                    />
                  )}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <SubmitButton isSubmitting={isPending} />
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    </>
  );
};
export default AddEmployeeService;
