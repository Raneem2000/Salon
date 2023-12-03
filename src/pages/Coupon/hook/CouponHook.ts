import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CouponQueries } from "../../../API/Coupon/CouponQueries";
import { useTranslation } from "react-i18next";
import { CpManagementQueries } from "../../../API/CpManagement/CpManagementQueries";
import { CountryQueries } from "../../../API/Country/CountryQueries";
import { CityQueries } from "../../../API/City/CityQueries";
import { AddCouponType } from "./type";
import { DefaultFromDate, DefaultToDate } from "../../../helper/DateHelpers";
import { FileQuery } from "../../../API/File/FileQueries";
import { useLocation, useNavigate, useParams } from "react-router";
import { showError, showSuccess } from "../../../libs/reactToastify";

const CouponHook = (Search?: string, PageNumber?: number) => {
  const [Query, setQuery] = useState<string>("");

  useEffect(() => {
    const time = setTimeout(() => {
      setQuery(Search!);
    }, 500);
    return () => clearTimeout(time);
  }, [Search]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
    watch,
    setError,
    clearErrors,
  } = useForm<AddCouponType>({
    defaultValues: {
      fromDate: DefaultFromDate(),
      toDate: DefaultToDate(),
    },
  });
  const { t } = useTranslation();
  const { data: Coupons, isLoading: isCouponsLoading } =
    CouponQueries.GetALLCouponsQuery({
      EnablePagination: true,
      PageNumber: PageNumber,
      Query: Query,
    });

  const { mutate: mutateImg, isPending: UploadingImg } =
    FileQuery.SetFileQuery();
  const { mutate: deleteImage } = FileQuery.DeleteFileQuery();
  const { mutate: deleteCoupon, isPending: isDeleting } =
    CouponQueries.DeleteCouponQuery();

  const { mutate: addCoupon, isPending: isAddingCoupon } =
    CouponQueries.SetCouponQuery();
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
  const { id } = useParams();

  const { data: ThisCoupon, isLoading: isThisCouponLoading } =
    CouponQueries.GetCouponQuery(id);

  const { data: CityData, isLoading: isLoadingCityData } =
    CityQueries.GetCityByIdQuery(ThisCoupon?.cityId);

  const { data: CountryData, isLoading: isLoadingCountryData } =
    CountryQueries.GetCountryByIdQuery(CityData?.countryId);

  const navigate = useNavigate();
  const location = useLocation();
  const isAddingPath = !id;

  const [img, setImg] = useState<string>("");
  const [PercentValue, setPercentValue] = useState("value");
  const [CityUser, setCityUser] = useState("Public");

  useEffect(() => {
    if (img !== "") {
      clearErrors("image");
    }
  }, [img]);

  const submitHandler = (data: AddCouponType) => {
    clearErrors("image");
    if (!data.name) {
      setError("name", { message: t("form.required") });
      return;
    }
    if (!data.code) {
      setError("code", { message: t("form.required") });
      return;
    }
    if (!data.fromDate) {
      setError("fromDate", { message: t("form.required") });
      return;
    }
    if (!data.fromDate) {
      setError("fromDate", { message: t("form.required") });
      return;
    }
    if (PercentValue === "value") {
      setValue("percentage", undefined);
    } else {
      setValue("value", undefined);
    }

    if (data.fromDate >= data.toDate) {
      setError("fromDate", { message: t("Coupon.fromError") });
      return;
    }
    if (PercentValue === "percent" && !getValues("percentage")) {
      setError("percentage", { message: t("form.required") });
      return;
    }
    if (PercentValue === "value" && !getValues("value")) {
      setError("value", { message: t("form.required") });
      return;
    }
    if (CityUser === "ByUser" && data.customers === undefined) {
      console.log("azb");

      setError("customers", { message: t("form.required") });
      return;
    }
    if (img === "") {
      setError("image", { message: t("Coupon.imageRequired") });
      return;
    } else {
      clearErrors("image");
    }

    addCoupon(
      {
        id: isAddingPath ? undefined : id,
        cityId: data.city?.id ?? undefined,
        code: data.code,
        image: img,
        name: data.name,
        fromDate: data.fromDate,
        toDate: data.toDate,
        percentage: data.percentage,
        value: getValues("value"),
        customers: data.customers
          ? data.customers?.map((customer) => customer.userId)
          : undefined,
        type: CityUser === "Public" ? 0 : CityUser === "ByCity" ? 2 : 1,
      },
      {
        onSuccess: () => {
          showSuccess(isAddingPath ? t("Coupon.added") : t("Coupon.edited"));
          reset();
          navigate(-1);
        },
        onError: () => {
          showError(t("Coupon.wrong"));
        },
      }
    );
  };

  return {
    register,
    control,
    Coupons,
    isCouponsLoading,
    t,
    isDeleting,
    deleteCoupon,
    isAddingCoupon,
    addCoupon,
    getValues,
    setValue,
    reset,
    watch,
    handleSubmit,
    errors,
    countries,
    isCountryLoading,
    cities,
    isCitiesLoading,
    Customers,
    customerLoading,
    mutateImg,
    UploadingImg,
    deleteImage,
    setError,
    navigate,
    ThisCoupon,
    isThisCouponLoading,
    location,
    id,
    CityData,
    isLoadingCityData,
    CountryData,
    isLoadingCountryData,
    isAddingPath,
    setCityUser,
    setImg,
    setPercentValue,
    submitHandler,
    PercentValue,
    img,
    CityUser,
  };
};

export default CouponHook;
