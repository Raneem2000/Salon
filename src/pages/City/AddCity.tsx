import React from 'react'
import { useTranslation } from "react-i18next";
import useCityHook from './hook/useCityHook';
import { Dialog, DialogActions, DialogContent, DialogTitle, Fab, Slide, Stack } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Loading from '../../Components/Loading';
import FormTextField from '../../Components/Form/FormTextField';
import SubmitButton from '../../Components/Form/SubmitButton';
import { TransitionProps } from "@mui/material/transitions";
import { CountryQueries } from '../../API/Country/CountryQueries';
import GenericObjectAutoComplete from "../../Components/Form/GenericObjectAutoComplete";
import { Controller } from 'react-hook-form';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const addCity: React.FC<{
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
    } = useCityHook(id);
  
    const { t } = useTranslation();

    const { data: countryOption } = CountryQueries.GetCountryAutoCompleteQuery();


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
          {id ? t("City.edit") : t("City.add")}
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
                <Controller
                  name="country"
                  control={control}
                  render={({ field, fieldState }) => (
                  <GenericObjectAutoComplete
                    option={countryOption}
                    value={field.value}
                    errorMessage={fieldState.error?.message}
                    onChange={field.onChange}
                    label={`${t("form.selectCountry")} *`}
                    required={true}
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
      </>
  )
}

export default addCity