import { Grid } from "@mui/material";
import FormTextField from "../Form/FormTextField";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import GenericObjectAutoCompleteNubmer from "../Form/GenericObjectAutoCompleteNubmer";
import { SalonTypeArray } from "../../API/Salon/type";

const Inputs: FC<{ control: any }> = ({ control }) => {
  const { t } = useTranslation();
  return (
    <>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.userName")}
          name="userName"
          req={true}
          shrink
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.description")}
          name="description"
          req={true}
          shrink
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.certificates")}
          name="certificates"
          req={true}
          shrink
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.experienceYears")}
          type="number"
          name="experienceYears"
          req={true}
          shrink
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <GenericObjectAutoCompleteNubmer
              onChange={field.onChange}
              value={field.value}
              option={SalonTypeArray}
              label={t("form.chooseGender")}
              req={true}
            />
          )}
        />
      </Grid>
    </>
  );
};
export default Inputs;
