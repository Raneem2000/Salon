import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import TitleWithArrow from "../../Components/TitleWithArrwo";
import { useTranslation } from "react-i18next";
import useBanner from "./hook/useBanner";
import FormTextField from "../../Components/Form/FormTextField";
import { ChangeEvent } from "react";
import { Controller } from "react-hook-form";
import GenericObjectAutoComplete from "../../Components/Form/GenericObjectAutoComplete";
import UploadGenericImg from "../../Components/Img/UploadGenericImg";
import ImgCard from "../../Components/Img/ImgCard";
import { API_SERVER_URL_For_Img } from "../../API/domain";
import { FileApi } from "../../API/File/FileApi";
import ModalImgCrop from "../../Components/Img/ModalImgCrop";
import SubmitButton from "../../Components/Form/SubmitButton";
import Loading from "../../Components/Loading";

const AddBanner = () => {
  const { t } = useTranslation();
  const {
    control,
    errors,
    radioSelect,
    setRadioSelect,
    salonOption,
    isLoading,
    bannerId,
    serviceOption,
    cityOption,
    imgAfterCrop,
    setImgAfterCrop,
    isPending,
    handleCropImg,
    genericFile,
    isPendingImg,
    openCropModal,
    setOpenCropModal,
    handleManipulateImage,
    handleSubmit,
    onSubmit,
  } = useBanner();
  return (
    <>
      <Box
        sx={{
          paddingInline: "40px",
          marginTop: "30px",
        }}
      >
        <TitleWithArrow title={bannerId ? t("Banner.edit") : t("Banner.add")} />
        {isLoading && bannerId ? (
          <Box marginTop="150px">
            <Loading />
          </Box>
        ) : (
          <Paper elevation={8} sx={{ paddingX: "20px", paddingBottom: "10px" }}>
            <form
              style={{
                marginTop: "50px",
              }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid
                item
                container
                lg={12}
                md={12}
                sm={12}
                spacing={{ xs: 2, md: 3 }}
              >
                <Grid item lg={4} md={4} sm={6}>
                  <FormTextField
                    label={t("form.fromDate")}
                    shrink
                    type="datetime-local"
                    name="fromDate"
                    control={control}
                    dataTest={"fromDate"}
                    req={true}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={6}>
                  <FormTextField
                    label={t("form.toDate")}
                    shrink
                    type="datetime-local"
                    name="toDate"
                    control={control}
                    dataTest={"toDate"}
                    req={true}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={6}>
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
                        disabled={typeof cityOption === "undefined"}
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={3} md={4} sm={6}>
                  {imgAfterCrop === "" ? (
                    <Controller
                      name="image"
                      control={control}
                      render={() => (
                        <UploadGenericImg
                          onFileUpload={handleManipulateImage}
                          buttonText={t("form.upLoadImg")}
                          errorMessage={errors.image?.message}
                        />
                      )}
                    />
                  ) : (
                    <ImgCard
                      imgSrc={`${API_SERVER_URL_For_Img}/${imgAfterCrop}`}
                      onDeleteImg={() => {
                        FileApi.DeleteFile(imgAfterCrop);
                        setImgAfterCrop("");
                      }}
                      title={t("form.img")}
                    />
                  )}
                </Grid>
              </Grid>
              <FormControl
                sx={{
                  margin: "15px",
                }}
              >
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={"link"}
                  name="radio-buttons-group"
                  row
                  value={radioSelect}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setRadioSelect(event.target.value)
                  }
                >
                  <FormControlLabel
                    value="link"
                    control={<Radio />}
                    label={t("form.link")}
                  />
                  <FormControlLabel
                    value="salon"
                    control={<Radio />}
                    label={t("links.salon")}
                  />
                  <FormControlLabel
                    value="service"
                    control={<Radio />}
                    label={t("serv.title")}
                  />
                </RadioGroup>
              </FormControl>
              <Box>
                {radioSelect === "link" && (
                  <FormTextField
                    shrink
                    label={t("form.link")}
                    name={"link"}
                    control={control}
                    sx={{ width: "50%" }}
                  />
                )}
                {radioSelect === "salon" && (
                  <Controller
                    name="salon"
                    control={control}
                    render={({ field }) => (
                      <GenericObjectAutoComplete
                        option={salonOption}
                        value={field.value}
                        onChange={field.onChange}
                        label={t("form.chooseSalaon")}
                        required={true}
                        sx={{ width: "50%" }}
                      />
                    )}
                  />
                )}
                {radioSelect === "service" && (
                  <Stack flexDirection={`row`} gap={`20px`}>
                    <Controller
                      name="salon"
                      control={control}
                      render={({ field }) => (
                        <GenericObjectAutoComplete
                          option={salonOption}
                          value={field.value}
                          onChange={field.onChange}
                          label={t("form.chooseSalaon")}
                          required={true}
                          sx={{ width: "100%" }}
                        />
                      )}
                    />
                    <Controller
                      name="service"
                      control={control}
                      render={({ field }) => (
                        <GenericObjectAutoComplete
                          option={serviceOption}
                          value={field.value}
                          onChange={field.onChange}
                          label={t("form.chooseService")}
                          required={true}
                          sx={{ width: "100%" }}
                          disabled={typeof serviceOption === "undefined"}
                        />
                      )}
                    />
                  </Stack>
                )}
              </Box>
              <Stack
                marginInline={`auto`}
                justifyContent={`center`}
                width={`fit-content`}
                marginY={`15px`}
              >
                <SubmitButton isSubmitting={isPending} />
              </Stack>
            </form>
            {genericFile && (
              <ModalImgCrop
                disableCropButton={isPendingImg}
                open={openCropModal}
                onClose={setOpenCropModal}
                handleCropImg={handleCropImg}
                imageFile={genericFile!}
                aspect={1 / 1}
              />
            )}
          </Paper>
        )}
      </Box>
    </>
  );
};
export default AddBanner;
