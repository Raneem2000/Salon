import { FC } from "react";
import { useTranslation } from "react-i18next";
import GenericObjectAutoCompleteNubmer from "../Form/GenericObjectAutoCompleteNubmer";
import { Controller } from "react-hook-form";
import { Grid } from "@mui/material";
import { SalonTypeArray } from "../../API/Salon/type";
import GenericObjectAutoComplete from "../Form/GenericObjectAutoComplete";
import { CityQueries } from "../../API/City/CityQueries";

const Select: FC<{ control: any }> = ({ control }) => {
  const { t } = useTranslation();
  //   const { data: CountryOption } = CountryQueries.GetCountryAutoCompleteQuery();
  const { data: cityOption } = CityQueries.GetCityAutoCompleteQuery();

  return (
    <>
      <Grid item lg={3} md={4} sm={6}>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <GenericObjectAutoComplete
              option={cityOption}
              value={field.value}
              onChange={field.onChange}
              label={t("form.chooseCity")}
              required={true}
            />
          )}
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <Controller
          name="SalonType"
          control={control}
          render={({ field }) => (
            <GenericObjectAutoCompleteNubmer
              onChange={field.onChange}
              value={field.value}
              option={SalonTypeArray}
              label={t("form.chooseSalonType")}
              req={true}
            />
          )}
        />
      </Grid>
    </>
  );
};
export default Select;
