import { Box, Grid, Paper, Stack } from "@mui/material";
import useSalon from "./hook/useSalon";
import TitleWithArrow from "../../Components/TitleWithArrwo";
import { useTranslation } from "react-i18next";
import Inputs from "../../Components/Salon/Inputs";
import { Controller } from "react-hook-form";
import UploadGenericImg from "../../Components/Img/UploadGenericImg";
import ImgCard from "../../Components/Img/ImgCard";
import { FileApi } from "../../API/File/FileApi";
import { API_SERVER_URL_For_Img } from "../../API/domain";
import ModalImgCrop from "../../Components/Img/ModalImgCrop";
import Select from "../../Components/Salon/Select";
import SalonSchedule from "../../Components/Salon/salonSchedule";
import SubmitButton from "../../Components/Form/SubmitButton";
import Loading from "../../Components/Loading";

const AddSalon = () => {
  const {
    control,
    setValue,
    watch,
    handleCropImgProduct,
    isLoading,
    handleManipulateImage,
    imgCoverAfterCrop,
    genericFile,
    setImgCoverAfterCrop,
    setImgTitle,
    imgagesAfterCrop,
    handleDeleteImg,
    isPendingImg,
    handleSubmit,
    onSubmit,
    openCropModal,
    setOpenCropModal,
    isPending,
    imgTitle,
    salonId,
    errors
  } = useSalon();
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          paddingInline: "40px",
          marginTop: "30px",
        }}
      >
        <TitleWithArrow title={salonId ? t("salon.edit") : t("salon.add")} />
        {isLoading && salonId ? (
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
                <Inputs errors={errors} control={control} setValue={setValue} watch={watch} />
                <Select control={control} />
                <Grid item lg={3} md={4} sm={6}>
                  {imgCoverAfterCrop === "" ? (
                    <Controller
                      name="coverImage"
                      control={control}
                      render={() => (
                        <UploadGenericImg
                          onFileUpload={handleManipulateImage}
                          buttonText={t("form.uploadImgForLogo")}
                          setImg={() => setImgTitle("cover")}
                          errorMessage={errors.coverImage?.message}
                        />
                      )}
                    />
                  ) : (
                    <ImgCard
                      imgSrc={`${API_SERVER_URL_For_Img}/${imgCoverAfterCrop}`}
                      onDeleteImg={() => {
                        FileApi.DeleteFile(imgCoverAfterCrop);
                        setImgCoverAfterCrop("");
                      }}
                      title={t("form.imgCover")}
                    />
                  )}
                </Grid>
                <Grid item lg={3} md={4} sm={6} flexShrink="0" flexGrow="0">
                  <UploadGenericImg
                    onFileUpload={handleManipulateImage}
                    buttonText={t("form.upLoadImg")}
                    setImg={() => setImgTitle("images")}
                  />
                </Grid>
                {imgagesAfterCrop &&
                  imgagesAfterCrop?.map((img, index) => (
                    <Grid item lg={3} md={4} sm={6}>
                      <ImgCard
                        imgSrc={`${API_SERVER_URL_For_Img}/${img}`}
                        onDeleteImg={() => {
                          handleDeleteImg(index);
                        }}
                      />
                    </Grid>
                  ))}
              </Grid>
              <SalonSchedule
                title={t("salon.SalonSchedule")}
                control={control}
                watch={watch}
              />
              <Stack
                marginInline={`auto`}
                justifyContent={`center`}
                width={`fit-content`}
                marginY={`15px`}
              >
                <SubmitButton isSubmitting={isPending} />
              </Stack>
            </form>
          </Paper>
        )}
        {genericFile && (
          <ModalImgCrop
            disableCropButton={isPendingImg}
            open={openCropModal}
            onClose={setOpenCropModal}
            handleCropImg={handleCropImgProduct}
            imageFile={genericFile!}
            aspect={imgTitle === "cover" ? 4 / 5 : 1 / 1.1}
          />
        )}
      </Box>
    </>
  );
};
export default AddSalon;
