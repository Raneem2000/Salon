import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import TitleWithArrow from "../../Components/TitleWithArrwo";
import { useTranslation } from "react-i18next";
import FormTextField from "../../Components/Form/FormTextField";
import useVersion from "./hook/useVersion";
import { Controller } from "react-hook-form";
import GenericObjectAutoCompleteNubmer from "../../Components/Form/GenericObjectAutoCompleteNubmer";
import { AppTypeArray } from "../../API/Version/type";
import SubmitButton from "../../Components/Form/SubmitButton";
import Loading from "../../Components/Loading";

const AddVersion = () => {
  const { t } = useTranslation();
  const { control, onSubmit, handleSubmit, isPending  , isLoading , versionId} = useVersion();
  return (
    <>
      <Box
        sx={{
          paddingInline: "40px",
          marginTop: "30px",
        }}
      >
        <TitleWithArrow title={versionId ? t("Version.edit") : t("Version.add")} />
        {isLoading ? 
        <Box marginTop="150px">
        <Loading />
      </Box>
        :
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
              <Grid item lg={3} md={4} sm={6}>
                <FormTextField
                  control={control}
                  label={t("form.title")}
                  name="title"
                  req={true}
                  shrink
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <FormTextField
                  control={control}
                  label={t("form.body")}
                  name="body"
                  req={true}
                  shrink
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <FormTextField
                  control={control}
                  label={t("form.iosVersionNumber")}
                  name="iosVersionNumber"
                  req={true}
                  shrink
                  type="number"
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <FormTextField
                  control={control}
                  label={t("form.iosVersionName")}
                  name="iosVersionName"
                  req={true}
                  shrink
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <FormTextField
                  control={control}
                  label={t("form.androidVersionNumber")}
                  name="androidVersionNumber"
                  req={true}
                  shrink
                  type="number"
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <FormTextField
                  control={control}
                  label={t("form.androidVersionName")}
                  name="androidVersionName"
                  req={true}
                  shrink
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <FormTextField
                  control={control}
                  label={t("form.androidUrl")}
                  name="androidUrl"
                  req={true}
                  shrink
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <FormTextField
                  control={control}
                  label={t("form.iosUrl")}
                  name="iosUrl"
                  req={true}
                  shrink
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <Controller
                  name={"isRequired"}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      label={t("form.isRequired")}
                      value={field.value}
                      control={
                        <Checkbox
                          value={field.value}
                          onChange={field.onChange}
                        />
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item lg={3} md={4} sm={6}>
                <Controller
                  name="appType"
                  control={control}
                  render={({ field }) => (
                    <GenericObjectAutoCompleteNubmer
                      onChange={field.onChange}
                      value={field.value}
                      option={AppTypeArray}
                      label={t("form.appType")}
                      req={true}
                    />
                  )}
                />
              </Grid>
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
}
      </Box>
    </>
  );
};
export default AddVersion;
