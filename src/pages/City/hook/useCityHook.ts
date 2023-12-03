import { useForm, SubmitHandler } from "react-hook-form";
import { setCityTypeInput } from "../../../API/City/type";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { CityQueries } from "../../../API/City/CityQueries";
import { useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "../../../libs/reactToastify";
import { makeActionArray } from "../../../helper/imgHelper";
import { CountryQueries } from "../../../API/Country/CountryQueries";

const useCityHook = (id?: string, _pageNumber?: number, _query?: string) => {
  const {
    control,
    handleSubmit,
    setValue,
    register,
    watch,
    reset,
  } = useForm<setCityTypeInput>();

  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: cityDetails, isLoading } = CityQueries.GetCityByIdQuery(id!);

  const { data: countryOption } = CountryQueries.GetCountryAutoCompleteQuery();

  useEffect(() => {
    if (typeof cityDetails !== undefined) {
      // console.log(cityDetails);
      setValue("enName", cityDetails?.name.find((d) => d.key === "en")?.value!);
      setValue("arName", cityDetails?.name.find((d) => d.key === "ar")?.value!);
      // const countryValue = countryOption?.find(
      //   (n: any) => n.id == cityDetails?.countryId
      // );
      // console.log(countryValue?.id)
      setValue(
        "country",
        countryOption?.find((d) => d.id === cityDetails?.countryId)!
      );
    }
  }, [cityDetails]);

  const { mutate, isPending } = CityQueries.SetCity();

  const onSubmit: SubmitHandler<setCityTypeInput> = async (data) => {
    mutate(
      {
        id: id ? id : undefined,
        countryId: watch("country").id,
        name: makeActionArray(data),
      },
      {
        onSuccess: () => {
          setOpen(false);
          reset({
            arName: "",
            enName: "",
            // country: "",
          });
          queryClient.refetchQueries({ queryKey: ["get-city"] });
          showSuccess(t("City.action"));
        },
        onError(error: any) {
          showError(error.response.data.errorMessage);
        },
      }
    );
  };

  return {
    control,
    setValue,
    open,
    setOpen,
    onSubmit,
    handleSubmit,
    isPending,
    register,
    cityDetails,
    isLoading,
    countryOption,
  };
};

export default useCityHook;
