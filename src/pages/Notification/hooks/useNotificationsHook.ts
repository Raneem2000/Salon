import { useEffect, useState } from "react";
import { NotificationQueries } from "../../../API/Notification/NotificationQueries";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddNotificationType } from "./type";
import { CpManagementQueries } from "../../../API/CpManagement/CpManagementQueries";
import { CountryQueries } from "../../../API/Country/CountryQueries";
import { CityQueries } from "../../../API/City/CityQueries";
import { useLocation, useNavigate, useParams } from "react-router";
import { showError, showSuccess } from "../../../libs/reactToastify";

const useNotificationsHook = (pageNumber?: number, Query?: string) => {
  const [query, setquery] = useState<string>("");
  const { t } = useTranslation();

  useEffect(() => {
    const time = setTimeout(() => {
      setquery(Query!);
    }, 500);
    return () => clearTimeout(time);
  }, [Query]);

  const location = useLocation();
  const { id } = useParams();
  const isAddingPath = !id;

  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    getValues,
    reset,
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<AddNotificationType>({
    defaultValues: {
      publicUserCity: "Public",
      customers: [],
      title: [
        {
          key: "ar",
          value: "",
        },
        {
          key: "en",
          value: "",
        },
      ],
      body: [
        {
          key: "ar",
          value: "",
        },
        {
          key: "en",
          value: "",
        },
      ],
    },
  });
  const publicUserCity = watch("publicUserCity");

  const { data: Notifications, isFetching } =
    NotificationQueries.GetNotificationCp({
      PageNumber: pageNumber,
      Query: query,
    });

  const { mutate: deleteNotification, isPending: isDeleting } =
    NotificationQueries.DeleteNotificationCp();

  const { mutate: setNotification, isPending: isPosting } =
    NotificationQueries.SetNotificationCp();

  const { data: countries, isLoading: isCountryLoading } =
    CountryQueries.GetCountryAutoCompleteQuery();
  const country = watch("country");
  const { data: cities, isLoading: isCitiesLoading } =
    CityQueries.GetCityByCountryQuery({
      enabled: country !== undefined,
      EnablePagination: false,
      CountryId: country?.id as string,
    });

  const { data: Customers, isLoading: customerLoading } =
    CpManagementQueries.useCpCustomersNames();

  const { data: ThisNotification, isLoading: isThisNotificationLoading } =
    NotificationQueries.GetNotificationByIdQuery(id);

  const { data: CityData, isLoading: isCityDataLoading } =
    CityQueries.GetCityByIdQuery(ThisNotification?.cityId);

  const { data: CountryData, isLoading: isCountryDataLoading } =
    CountryQueries.GetCountryByIdQuery(CityData?.countryId);

  const submitHandler: SubmitHandler<AddNotificationType> = (
    data: AddNotificationType
  ) => {
    console.log({ data });

    const titleArabic = data.title[0].value.trim();
    const titleEnglish = data.title[1].value.trim();
    const bodyArabic = data.body[0].value.trim();
    const bodyEnglish = data.body[1].value.trim();
    const usersNumber = data.customers?.length;
    const city = data.city ?? undefined;
    const AppType = data.AppType;

    if (!titleArabic && !titleEnglish) {
      setError("title.0.value", { message: "One Title is required" });
      return;
    } else {
      clearErrors("title.0.value");
    }

    if (!bodyArabic && !bodyEnglish) {
      setError("body.0.value", { message: "One Body is required" });
      return;
    } else {
      clearErrors("body.0.value");
    }
    if (!usersNumber && publicUserCity === "User") {
      setError("customers", { message: "Users is Required" });
      return;
    } else {
      clearErrors("customers");
    }

    if (!city && publicUserCity === "City") {
      setError("city.name", { message: "City is Required" });
      return;
    } else {
      clearErrors("city");
    }

    if (AppType === undefined) {
      setError("AppType", { message: t("form.required") });

      return;
    } else {
      clearErrors("AppType");
    }

    setNotification(
      {
        id: isAddingPath ? undefined : id,
        title: getValues("title"),
        users:
          publicUserCity === "User"
            ? data.customers.map((customer) => customer.userId)
            : [],
        body: getValues("body"),
        cityId: data.city?.id!,
        notificationType:
          publicUserCity === "Public" ? 1 : publicUserCity === "User" ? 2 : 3,
        appType: AppType,
      },
      {
        onSuccess: () => {
          reset();
          showSuccess(t("Notification.added"));
          navigate(-1);
        },
        onError: () => {
          showError(t("Notification.wrong"));
        },
      }
    );
  };

  return {
    Notifications,
    isFetching,
    t,
    deleteNotification,
    isDeleting,
    setNotification,
    isPosting,
    control,
    register,
    submitHandler,
    handleSubmit,
    errors,
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    getValues,
    countries,
    isCountryLoading,
    cities,
    isCitiesLoading,
    Customers,
    customerLoading,
    location,
    id,
    navigate,
    ThisNotification,
    isThisNotificationLoading,
    CountryData,
    isCountryDataLoading,
    CityData,
    isCityDataLoading,
  };
};

export default useNotificationsHook;
