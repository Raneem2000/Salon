import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";
import { useTranslation } from "react-i18next";
import { DayArray, SalonTypeArray } from "../../../API/Salon/type";
import { handleCropImgType } from "../../../interface/generic";
import { FileQuery } from "../../../API/File/FileQueries";
import {
  DefaultFromDateHours,
  convertToInputTimeSalon,
  dayTimeConvert,
} from "../../../helper/imgHelper";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { showError, showSuccess } from "../../../libs/reactToastify";
import { EmpInput } from "../../../API/Emplyee/type";
import EmployeeQureis from "../../../API/Emplyee/EmployeeQureis";

const useEmployee = () => {
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: {  errors },
  } = useForm<EmpInput>({
    defaultValues: {
      workSchedule: Array(7).fill({
        day: DayArray[0],
        startTime: DefaultFromDateHours(),
        endTime: DefaultFromDateHours(),
        isFree: true,
      }),
    },
  });
  const { salonId } = useParams();
  const { empId } = useParams();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [openCropModal, setOpenCropModal] = useState<boolean>(false);
  const [imgagesAfterCrop, setImegesAfterCrop] = useState<string>("");
  const [genericFile, setGenericFile] = useState<File | null>(null);
  const { data: employeeDetails, isLoading } =
    EmployeeQureis.GetEmpDetailsQuery(empId!);
  // console.log(employeeDetails);
  useEffect(() => {
    if (employeeDetails) {
      setValue("userName", employeeDetails.empName!);
      setValue("id", employeeDetails.id);
      setValue("description", employeeDetails.description);
      setValue("certificates", employeeDetails.certificates);
      setValue("experienceYears", employeeDetails.experienceYears);
      setImegesAfterCrop(employeeDetails.image);
      setValue(
        "gender",
        SalonTypeArray.find((t) => t.id === employeeDetails.gender)!
      );
      employeeDetails.workSchedule.forEach((day, index) => {
        // setValue(`workSchedule.${index}.day`,day)
        setValue(`workSchedule.${index}.isFree`, day.isFree);
        setValue(
          `workSchedule.${index}.startTime`,
          convertToInputTimeSalon(day.startTime!)
        );
        setValue(
          `workSchedule.${index}.endTime`,
          convertToInputTimeSalon(day.endTime!)
        );
      });
    }
  }, [employeeDetails]);
  useEffect(() => {
    if (imgagesAfterCrop) {
      clearErrors("image");
    }
  }, [imgagesAfterCrop]);
  const handleManipulateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setGenericFile(file);
    setOpenCropModal(!openCropModal);
  };

  const { mutate: mutationImg, isPending: isPendingImg } =
    FileQuery.SetFileQuery();
  const handleCropImg: handleCropImgType = async (imgFile) => {
    const formData = new FormData();
    formData.append("File", imgFile);
    mutationImg(
      {
        File: imgFile,
        FileType: 5,
      },
      {
        onSuccess(data) {
          setImegesAfterCrop(data);
          setOpenCropModal(false);
        },
      }
    );
  };
  const { mutate, isPending } = EmployeeQureis.SetEmpQuery();
  const onSubmit = () => {
    if (imgagesAfterCrop === "") {
      setError("image", { message: t("form.required") });
      return;
    }
    mutate(
      {
        id: empId ? empId : undefined,
        userName: watch("userName"),
        description: watch("description"),
        certificates: watch("certificates"),
        experienceYears: watch("experienceYears"),
        gender: watch("gender").id,
        image: imgagesAfterCrop,
        salonId: salonId!,
        workSchedule: watch("workSchedule").map((day, index) => {
          return {
            day: index,
            startTime: dayTimeConvert(day.startTime),
            endTime: dayTimeConvert(day.endTime),
            isFree: day.isFree ? day.isFree : false,
          };
        }),
      },
      {
        onSuccess: () => {
          navigate(-1);
          queryClient.refetchQueries({ queryKey: ["get-all-employee"] });
          showSuccess(t("emp.action"));
        },
        onError(error: any) {
          showError(error.response.data.errorMessage);
        },
      }
    );
    // console.log(watch("workSchedule"));
  };
  return {
    control,
    isPending,
    errors,
    watch,
    onSubmit,
    imgagesAfterCrop,
    setImegesAfterCrop,
    genericFile,
    setGenericFile,
    openCropModal,
    setOpenCropModal,
    handleSubmit,
    handleCropImg,
    handleManipulateImage,
    isPendingImg,
    isLoading,
    empId,
  };
};
export default useEmployee;
