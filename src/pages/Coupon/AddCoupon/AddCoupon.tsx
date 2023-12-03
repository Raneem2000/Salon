import { Box, Button, Grid } from "@mui/material";
import CouponHook from "../hook/CouponHook";
import { useEffect } from "react";
import NameAndCode from "./NameAndCode";
import SetDate from "./SetDate";
import PercentValueComponent from "./PercentValueComponent";
import PublicCityUser from "./PublicCityUser";
import CouponImage from "./CouponImage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Title from "../../../Components/Title.tsx";
import { FromISO } from "../../../helper/DateHelpers.ts";
import Loading from "../../../Components/Loading.tsx";
const AddCoupon = () => {
  const {
    isAddingCoupon,
    handleSubmit,
    errors,
    t,
    setValue,
    register,
    control,
    PercentValue,
    img,
    CityUser,
    navigate,
    submitHandler,
    setImg,
    setPercentValue,
    setCityUser,
    isAddingPath,
    ThisCoupon,
    isThisCouponLoading,
    countries,
    cities,
    CityData,
    isLoadingCityData,
    CountryData,
    isLoadingCountryData,
  } = CouponHook();

  useEffect(() => {
    if (!!ThisCoupon && !isAddingPath) {
      setValue("name", ThisCoupon?.name);
      setValue("code", ThisCoupon?.code);
      setImg(ThisCoupon.image);
      setValue("fromDate", FromISO(ThisCoupon.fromDate));
      setValue("toDate", FromISO(ThisCoupon.toDate));
      setValue("value", ThisCoupon.value);
      setValue("percentage", ThisCoupon.percentage);
      if (!!ThisCoupon.percentage) {
        setPercentValue("percent");
      }
      if (ThisCoupon.type === 2) {
        if (!!CountryData) {
          setCityUser("ByCity");
          setValue("country.id", CountryData?.id!);
          setValue(
            "country.name",
            CountryData?.name.filter((name) => name.key === "en")[0].value ??
              CountryData.name[0].value
          );
        }
        if (!!CityData) {
          setValue("city.id", CityData?.id!);
          setValue(
            "city.name",
            CityData?.name.filter((name) => name.key === "en")[0].value ??
              CityData.name[0].value
          );
        }
      }
      if (ThisCoupon.type === 1) {
        setCityUser("ByUser");
        setValue(
          "customers",
          ThisCoupon.userInfo.map((customer) => {
            return {
              userId: customer.id,
              userName: customer.name,
              phoneNumber: customer.phoneNumber,
            };
          })
        );
      }
    }
  }, [ThisCoupon, CountryData, CityData]);

  if (isThisCouponLoading || isLoadingCityData || isLoadingCountryData) {
    return <Loading />;
  }

  return (
    <>
      <Grid container justifyContent={"space-between"} sx={{ mt: 2 }}>
        <Grid container item xs={9}>
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon />
          </Button>
          <Grid item sx={{ mx: 5 }}>
            <Title
              text={isAddingPath ? t("Coupon.addTitle") : t("Coupon.editTitle")}
            />
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ m: 3 }}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <NameAndCode
                errors={errors}
                register={register}
                control={control}
              />
              <SetDate control={control} />
              <PercentValueComponent
                setPercentValue={setPercentValue}
                PercentValue={PercentValue}
                errors={errors}
                register={register}
              />
            </Grid>
          </Box>
          <Grid item xs={12}>
            <PublicCityUser
              control={control}
              CityUser={CityUser}
              setCityUser={setCityUser}
              setValue={setValue}
              register={register}
              errors={errors}
              countries={countries}
              cities={cities}
            />

            <CouponImage
              img={img}
              setImg={setImg}
              setValue={setValue}
              errors={errors}
            />
          </Grid>
          <Grid container justifyContent={"end"} sx={{ mt: "10px" }}>
            <Button disabled={isAddingCoupon} type="submit" variant="contained">
              {t("form.submit")}
            </Button>
          </Grid>
        </form>
      </Box>
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default AddCoupon;
