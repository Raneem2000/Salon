import { useForm } from "react-hook-form";
import { SetBannerTypeInput } from "../../../API/Banner/type";
import { DefaultFromDate, DefaultToDate } from "../../../helper/imgHelper";
import { useNavigate, useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SalonQueries } from "../../../API/Salon/SalonQueries";
import { ServiceQueries } from "../../../API/Service/ServiceQueries";
import { CityQueries } from "../../../API/City/CityQueries";
import { FileQuery } from "../../../API/File/FileQueries";
import { handleCropImgType } from "../../../interface/generic";
import { BannerQuery } from "../../../API/Banner/BannerQueries";
import { showError, showSuccess } from "../../../libs/reactToastify";
import { useTranslation } from "react-i18next";

const useBanner = () => {
  const { control, setValue, handleSubmit, watch , setError  , clearErrors , formState :{errors} } =
    useForm<SetBannerTypeInput>({
      defaultValues: {
        fromDate: DefaultFromDate(),
        toDate: DefaultToDate(),
      },
    });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { bannerId } = useParams();
  const { data: bannerDetails, isLoading } = BannerQuery.GetBannerByIdQuery(
    bannerId!
  );
  // console.log(bannerDetails, bannerId);
  const { data: salonId } = ServiceQueries.GetSalonByServIdDetailsQuery(
    bannerDetails?.serviceId  ? bannerDetails?.serviceId! : ""
  );
  const { data: serviceOption } =
    ServiceQueries.GetServiceDetailsAutoCompleteQuery(watch("salon")?.id);
    const { data: salonOption } = SalonQueries.GetSalonOption();
  useEffect(() => {
    if (bannerDetails) {
      setValue("fromDate", bannerDetails.fromDate.slice(0, 16));
      // console.log(bannerDetails.fromDate)
      setValue("toDate", bannerDetails.toDate.slice(0, 16));
      setValue("city", cityOption?.find((d) => d.id === bannerDetails.cityId)!);
      setValue("id", bannerDetails.id);
      setImgAfterCrop(bannerDetails.imageURl);
      if (bannerDetails.link) {
        setRadioSelect("link");
        setValue("link", bannerDetails.link);
      } else if (bannerDetails.serviceId) {
        setRadioSelect("service");
        setValue("salon", salonOption?.find((d) => d.id === salonId)!);
        setValue(
          "service",
          serviceOption?.find((d) => d.id === bannerDetails.serviceId)!
        );
      } else if (bannerDetails.salonId) {
        setRadioSelect("salon");
        setValue(
          "salon",
          salonOption?.find((d) => d.id === bannerDetails.salonId)!
        );
      }
    }
  }, [bannerDetails , salonId , serviceOption]);

  // console.log(watch("salon"))
  const [openCropModal, setOpenCropModal] = useState<boolean>(false);
  const [imgAfterCrop, setImgAfterCrop] = useState<string>("");
  const [genericFile, setGenericFile] = useState<File | null>(null);
  
  const { data: cityOption } = CityQueries.GetCityAutoCompleteQuery();
  const [radioSelect, setRadioSelect] = useState<string>("link");
  const handleManipulateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setGenericFile(file);
    setOpenCropModal(!openCropModal);
  };

  const { mutate, isPending } = BannerQuery.SetBannerQuery();
  const { t } = useTranslation();
  const { mutate: mutationImg, isPending: isPendingImg } =
    FileQuery.SetFileQuery();
  const handleCropImg: handleCropImgType = async (imgFile) => {
    const formData = new FormData();
    formData.append("File", imgFile);
    mutationImg(
      {
        File: imgFile,
        FileType: 1,
      },
      {
        onSuccess(data) {
          setImgAfterCrop(data);
          setOpenCropModal(false);
        },
      }
    );
  };
  useEffect(()=>{
   if(imgAfterCrop){
    clearErrors("image")
   }
  },[imgAfterCrop])
  const onSubmit = () => {
    if (imgAfterCrop === "") {
      setError("image", { message: t("form.required") });
      return;
    }
    mutate(
      {
        id: watch("id") ? watch("id") : undefined,
        fromDate: watch("fromDate"),
        toDate: watch("toDate"),
        image: imgAfterCrop,
        citytId: watch("city").id,
        link: watch("link") ? watch("link") : undefined,
        serviceId: watch("service") ? watch("service").id! : undefined,
        salonId:
          radioSelect === "salon" && watch("salon")
            ? watch("salon").id
            : undefined,
      },

      {
        onSuccess: () => {
          navigate(-1);
          queryClient.refetchQueries({ queryKey: ["get-all-banner"] });
          showSuccess(t("Banner.action"));
        },
        onError(errorMessage: any) {
          showError(errorMessage);
        },
      }
    );
  };
  return {
    control,
    isPending,
    setValue,
    isLoading,
    bannerId,
    onSubmit,
    errors,
    radioSelect,
    setRadioSelect,
    salonOption,
    serviceOption,
    cityOption,
    handleCropImg,
    handleManipulateImage,
    handleSubmit,
    imgAfterCrop,
    openCropModal,
    setGenericFile,
    setImgAfterCrop,
    genericFile,
    isPendingImg,
    setOpenCropModal,
  };
};
export default useBanner;
