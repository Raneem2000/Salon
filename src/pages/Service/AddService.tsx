import { Box, Grid, Paper, Stack } from "@mui/material";
import TitleWithArrow from "../../Components/TitleWithArrwo";
import { useTranslation } from "react-i18next";
import useService from "./hook/useService";
import Inputs from "../../Components/Service/Inpts";
import { Controller } from "react-hook-form";
import UploadGenericImg from "../../Components/Img/UploadGenericImg";
import ImgCard from "../../Components/Img/ImgCard";
import { API_SERVER_URL_For_Img } from "../../API/domain";
import ModalImgCrop from "../../Components/Img/ModalImgCrop";
import SubmitButton from "../../Components/Form/SubmitButton";
import Loading from "../../Components/Loading";
const AddService = () => {
  const { t } = useTranslation();
  const {
    control,
    handleCropImg,
    handleManipulateImage,
    setDeletedImages,
    imgCoverAfterCrop,
    imgagesAfterCrop,
    setImgTitle,
    setImgCoverAfterCrop,
    genericFile,
    isPendingImg,
    openCropModal,
    imgTitle,
    setImegesAfterCrop,
    setOpenCropModal,
    handleSubmit,
    onSubmit,
    isPending,
    isLoading,
    errors,
    servId,
  } = useService();
  return (
    <>
      <Box
        sx={{
          paddingInline: "40px",
          marginTop: "30px",
        }}
      >
        <TitleWithArrow title={servId ? t("serv.edit") : t("serv.add")} />
        {isLoading && servId ? (
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
                <Inputs control={control} />
                <Grid item lg={3} md={4} sm={6}>
                  {imgCoverAfterCrop === "" ? (
                    <Controller
                      name="coverImage"
                      control={control}
                      render={() => (
                        <UploadGenericImg
                          onFileUpload={handleManipulateImage}
                          buttonText={t("form.uploadImgForCover")}
                          setImg={() => setImgTitle("cover")}
                          errorMessage={errors.coverImage?.message}
                        />
                      )}
                    />
                  ) : (
                    <ImgCard
                      imgSrc={`${API_SERVER_URL_For_Img}/${imgCoverAfterCrop}`}
                      onDeleteImg={() => {
                        setDeletedImages((prevImages) => [
                          ...prevImages!,
                          imgCoverAfterCrop,
                        ]);
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
                          const updatedImages = [...imgagesAfterCrop];
                          updatedImages.splice(index, 1);
                          setDeletedImages((prevImages) => [
                            ...prevImages!,
                            img,
                          ]);
                          setImegesAfterCrop(updatedImages);
                        }}
                      />
                    </Grid>
                  ))}
              </Grid>
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
            handleCropImg={handleCropImg}
            imageFile={genericFile!}
            aspect={imgTitle === "cover" ? 4 / 5 : 1 / 1.1}
          />
        )}
      </Box>
    </>
  );
};
export default AddService;
