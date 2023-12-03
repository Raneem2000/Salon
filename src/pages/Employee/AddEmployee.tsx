import { Box, Grid, Paper, Stack } from "@mui/material";
import TitleWithArrow from "../../Components/TitleWithArrwo";
import { useTranslation } from "react-i18next";
import useEmployee from "./hook/useEmployee";

import Inputs from "../../Components/Employee/Inputs";
import { Controller } from "react-hook-form";
import UploadGenericImg from "../../Components/Img/UploadGenericImg";
import ImgCard from "../../Components/Img/ImgCard";
import { API_SERVER_URL_For_Img } from "../../API/domain";
import { FileApi } from "../../API/File/FileApi";
import ModalImgCrop from "../../Components/Img/ModalImgCrop";
import SalonSchedule from "../../Components/Salon/salonSchedule";
import SubmitButton from "../../Components/Form/SubmitButton";
import Loading from "../../Components/Loading";
const AddEmployee = () => {
  const { t } = useTranslation();
  const {
    control,
    onSubmit,
    imgagesAfterCrop,
    setImegesAfterCrop,
    handleCropImg,
    handleManipulateImage,
    handleSubmit,
    openCropModal,
    isPending,
    errors,
    setOpenCropModal,
    genericFile,
    isPendingImg,
    watch,
    isLoading,
    empId,
  } = useEmployee();
  return (
    <>
      <Box
        sx={{
          paddingInline: "40px",
          marginTop: "30px",
        }}
      >
        <TitleWithArrow title={empId ? t("emp.edit") : t("emp.add")} />
        {isLoading && empId ? (
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
                  {imgagesAfterCrop === "" ? (
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
                      imgSrc={`${API_SERVER_URL_For_Img}/${imgagesAfterCrop}`}
                      onDeleteImg={() => {
                        FileApi.DeleteFile(imgagesAfterCrop);
                        setImegesAfterCrop("");
                      }}
                      title={t("form.img")}
                    />
                  )}
                </Grid>
              </Grid>
              <SalonSchedule
                title={t("emp.empSchedule")}
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
export default AddEmployee;
