import { Grid } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import FormTextField from "../Form/FormTextField";
import SelectLocation from "../Form/SelectLocation";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { SalonInput } from "../../API/Salon/type";

const Inputs: FC<{
  control: any;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors<SalonInput>;
}> = ({ control, setValue, watch, errors }) => {
  const { t } = useTranslation();
  return (
    <>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.name")}
          name="name"
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
          label={t("form.phoneNumber")}
          name="phoneNumber"
          req={true}
          shrink
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.tempPhoneNumber")}
          name="tempPhoneNumber"
          // req={true}
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.facebookUrl")}
          name="facebookUrl"
          req={true}
          shrink
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.instagramUrl")}
          name="instagramUrl"
          req={true}
          shrink
        />
      </Grid>
      {!watch("latitude") && !watch("longitude") ? (
        <Grid item lg={3} md={4} sm={6}>
          <SelectLocation setValue={setValue} error={errors.latitude?.message!} />
        </Grid>
      ) : (
        <>
          <Grid item lg={3} md={4} sm={6}>
            <FormTextField
              label={t("form.latitude")}
              name="latitude"
              shrink
              control={control}
              type="number"
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6}>
            <FormTextField
              label={t("form.longitude")}
              name="longitude"
              shrink
              control={control}
              type="number"
            />
          </Grid>
        </>
      )}
    </>
  );
};
export default Inputs;
