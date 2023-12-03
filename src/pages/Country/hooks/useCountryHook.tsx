import { CountryQueries } from "../../../API/Country/CountryQueries";
import { SubmitHandler, useForm } from "react-hook-form";
import {  SetCountryTypeInput } from "../../../API/Country/Type";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "../../../libs/toast/Tostify";
import { makeActionArray } from "../../../helper/imgHelper";
import { useTranslation } from "react-i18next";

const useCountryHook = (id?: string, pageNumber?: number , query?: string) => {
  const {
    control,
    handleSubmit,
    setValue,
    register,
    watch,
    reset,
  } = useForm<SetCountryTypeInput>();

  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const { data: countryDetails, isLoading } =
    CountryQueries.GetCountryByIdQuery(id!);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (typeof countryDetails !== undefined) {
      // console.log(countryDetails);
      setValue('enName', countryDetails?.name.find((d) => d.key === 'en')?.value!);
      setValue('arName' , countryDetails?.name.find((d) => d.key === 'ar')?.value!);
      setValue('currency' , countryDetails?.currency!);
      setValue('countryCode', countryDetails?.countryCode!);
    }
  }, [countryDetails]);

  const { data: allCountries, isLoading: allCountriesIsLoading , refetch , isFetching } =
    CountryQueries.GetAllCountryQuery({ PageNumber: pageNumber , Query : query });
  const { mutate, isPending } = CountryQueries.SetCountry();
  const onSubmit: SubmitHandler<SetCountryTypeInput> = async (data) => {
    mutate(
      {
        id: id,
        countryCode: watch("countryCode"),
        currency: watch("currency"),
        name: makeActionArray(data),
      },
      {
        onSuccess: () => {
          setOpen(false);
          reset({
            arName: "",
            enName: "",
            currency: "",
            countryCode: "",
          });
          queryClient.refetchQueries({ queryKey: ["get-all-country"] });
          showSuccess(t("Country.action"));
        },
        onError(error: any) {
          showError(error.response.data.errorMessage);
        },
      }
    );
  };

  return {
    allCountries,
    isFetching,
    allCountriesIsLoading,
    refetch,
    control,
    setValue,
    open,
    setOpen,
    onSubmit,
    handleSubmit,
    isPending,
    register,
    countryDetails,
    isLoading,
  };
};

export default useCountryHook;
