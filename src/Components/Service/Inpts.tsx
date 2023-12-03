import { FC } from "react";
import FormTextField from "../Form/FormTextField";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import GenericObjectAutoComplete from "../Form/GenericObjectAutoComplete";
import { CategoryQuery } from "../../API/Category/CategoryQueries";

const Inputs: FC<{
  control: any;
}> = ({ control }) => {
  const { t } = useTranslation();
  const { data: categoryOP } = CategoryQuery.GetCategoryAutoComplete();

  return (
    <>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.enName")}
          name="enName"
          req={true}
          shrink
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.arName")}
          name="arName"
          req={true}
          shrink
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.enDescription")}
          name="enDescription"
          req={true}
          shrink
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.arDescription")}
          name="arDescription"
          req={true}
          shrink
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.price")}
          type="number"
          name="price"
          req={true}
          shrink
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.offerPrice")}
          name="offerPrice"
          type="number"
          req={true}
          shrink
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.period")}
          name="period"
          type={"time"}
          step={"1"}
          req={true}
          shrink
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <GenericObjectAutoComplete
              option={categoryOP}
              value={field.value}
              onChange={field.onChange}
              label={t("form.chooseCategory")}
              required={true}
            />
          )}
        />
      </Grid>
    </>
  );
};
export default Inputs;
