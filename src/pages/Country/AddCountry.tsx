import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import useCountryHook from "./hooks/useCountryHook";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import Loading from "../../Components/Loading";
import Slide from "@mui/material/Slide";
import FormTextField from "../../Components/Form/FormTextField";
import SubmitButton from "../../Components/Form/SubmitButton";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddCountry: React.FC<{
    id?: string;
    setId?: (id: string) => void;
  }> = ({ id, setId }) => {
    const {
      control,
      handleSubmit,
      onSubmit,
      open,
      setOpen,
      isPending,
      isLoading,
    } = useCountryHook(id);
  
    const { t } = useTranslation();

return (
    <>
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
          {id ? t("Country.edit") : t("Country.add")}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isLoading ? (
            <Loading />
          ) : (
            <DialogContent>
              <Stack flexDirection="column" spacing={5} padding="15px">
                <FormTextField
                  control={control}
                  label={t("form.arName")}
                  name="arName"
                  req={true}
                  shrink
                />
                <FormTextField
                  control={control}
                  label={t("form.enName")}
                  name="enName"
                  req={true}
                  shrink
                />
                <FormTextField
                  control={control}
                  name="currency"
                  label={t("form.currency")}
                  req
                  shrink
                />
                <FormTextField
                  control={control}
                  name="countryCode"
                  label={t("form.countryCode")}
                  req
                  shrink
                />
              </Stack>
            </DialogContent>
          )}
          <DialogActions>
            <SubmitButton isSubmitting={isPending} />
          </DialogActions>
        </form>
      </Dialog>
      </>
)}
export default AddCountry;
