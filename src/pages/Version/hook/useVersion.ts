import { useForm } from "react-hook-form";
import { AppTypeArray, VersionInput } from "../../../API/Version/type";
import { VersionQueries } from "../../../API/Version/VersionQueries";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { showError, showSuccess } from "../../../libs/reactToastify";
import { useEffect } from "react";

const useVersion = () => {
  const { control, setValue, handleSubmit, watch } = useForm<VersionInput>();
  const { mutate, isPending } = VersionQueries.SetVersionQuery();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { versionId } = useParams();
  const { data: versionDetail, isLoading } =
    VersionQueries.GetVersionDetailsQuery(versionId!);
  // console.log(versionDetail)
  useEffect(() => {
    if (versionDetail) {
      setValue("id", versionDetail.id);
      setValue("title", versionDetail.title);
      setValue("body", versionDetail.body);
      setValue("androidUrl", versionDetail.androidUrl);
      setValue("iosUrl", versionDetail.iosUrl);
      setValue("androidVersionName", versionDetail.androidVersionName);
      setValue("androidVersionNumber", versionDetail.androidVersionNumber);
      setValue("iosVersionName", versionDetail.iosVersionName);
      setValue("iosVersionNumber", versionDetail.iosVersionNumber);
      setValue("isRequired", versionDetail.isRequired);
      setValue(
        "appType",
        AppTypeArray.find((d) => d.id === versionDetail.appType)!
      );
    }
  }, [versionDetail]);
  const onSubmit = () => {
    mutate(
      {
        id: watch("id") ? watch("id") : undefined,
        androidUrl: watch("androidUrl"),
        androidVersionName: watch("androidVersionName"),
        androidVersionNumber: watch("androidVersionNumber"),
        body: watch("body"),
        title: watch("title"),
        iosUrl: watch("iosUrl"),
        iosVersionName: watch("iosVersionName"),
        iosVersionNumber: watch("iosVersionNumber"),
        isRequired: watch("isRequired"),
        appType: watch("appType").id,
      },
      {
        onSuccess: () => {
          navigate(-1);
          queryClient.refetchQueries({ queryKey: ["get-all-Version"] });
          showSuccess(t("Version.action"));
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
    handleSubmit,
    isLoading,
    versionId,
    onSubmit,
    isPending,
  };
};
export default useVersion;
