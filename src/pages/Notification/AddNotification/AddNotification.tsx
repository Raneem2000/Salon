import { Button, Grid } from "@mui/material";
import useNotificationsHook from "../hooks/useNotificationsHook.ts";
import TitleAndBody from "./TitleAndBody.tsx";
import CountryCity from "./CountryCity.tsx";
import Users from "./Users.tsx";
import AppType from "./AppType.tsx";
import ChooseType from "./ChooseType.tsx";
import Title from "../../../Components/Title.tsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";
import Loading from "../../../Components/Loading.tsx";

const AddNotification = () => {

  const {
    isPosting,
    t,
    control,
    errors,
    countries, isCountryLoading, cities, isCitiesLoading, Customers, customerLoading,
    ThisNotification,
    isThisNotificationLoading, id,
    register, handleSubmit, navigate,
    watch, setValue, submitHandler,
    CountryData, CityData, isCountryDataLoading, isCityDataLoading
  } = useNotificationsHook();

  const isAddingPath = !id;



  const publicUserCity = watch('publicUserCity');
  useEffect(() => {
    if (!isAddingPath && !!ThisNotification) {

      setValue('title', ThisNotification?.title as [{ key: 'ar', value: string }, { key: 'en', value: string }])
      setValue('body', ThisNotification?.body as [{ key: 'ar', value: string }, { key: 'en', value: string }])
      setValue('AppType', ThisNotification?.appType!);

      if (ThisNotification.notificationType === 1) {
        setValue('publicUserCity', 'Public')
      }
      else if (ThisNotification.notificationType === 2) {
        setValue('publicUserCity', 'User')
        setValue('customers', ThisNotification.customers.map((customer) => { return ({ userId: customer.id, userName: customer.name, phoneNumber: customer.phoneNumber, }) }))
      }
      else {
        setValue('publicUserCity', 'City')
        setValue('country.id', CountryData?.id!)
        setValue('country.name', CountryData?.name[0].value!);
        setValue('city.id', CityData?.id!);
        setValue('city.name', CityData?.name[0].value!)

      }

    }
  }, [ThisNotification, CountryData, CityData])

  if (isThisNotificationLoading || isCountryDataLoading || isCityDataLoading || isCountryLoading) {
    return <Loading />
  }


  if (
    isThisNotificationLoading ||
    isCountryDataLoading ||
    isCityDataLoading ||
    isCountryLoading
  ) {
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
              text={
                isAddingPath
                  ? t("Notification.Add")
                  : t("Notification.EditTitle")
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <form
          onSubmit={handleSubmit(submitHandler)}
          style={{ width: "100%", margin: "5%" }}
        >
          <TitleAndBody register={register} errors={errors} control={control} />

          <AppType watch={watch} control={control} errors={errors} />

          <ChooseType publicUserCity={publicUserCity} setValue={setValue} />
          {publicUserCity === "User" && (
            <>
              <Users
                Customers={Customers}
                errors={errors}
                register={register}
                setValue={setValue}
                watch={watch}
                customerLoading={customerLoading}
                control={control}
              />
            </>
          )}
          {publicUserCity === "City" && (
            <>
              <CountryCity
                watch={watch}
                cities={cities}
                countries={countries}
                errors={errors}
                setValue={setValue}
                register={register}
                isCitiesLoading={isCitiesLoading}
                isCountryLoading={isCountryLoading}
                control={control}
              />
            </>
          )}
          <Grid container justifyContent={"flex-end"}>
            <Button
              sx={{ mt: "10px" }}
              disabled={isPosting}
              type="submit"
              variant="contained"
            >
              {t("form.submit")}
            </Button>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default AddNotification;
