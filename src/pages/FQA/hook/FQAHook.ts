import { useTranslation } from "react-i18next";
import { FQAQueries } from "../../../API/FQA/FQAQueries";
import { useForm } from "react-hook-form";
import { SetFQAType } from "./type";
import { Initial_values } from "./initialValues";
import { showError, showSuccess } from "../../../libs/reactToastify";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

const FQAHook = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: FQAs, isLoading: isFQALoading } = FQAQueries.GetAllFqaQuery();
  const { mutate: setFQA, isPending: isSettingFQA } = FQAQueries.SetFqaQuery();
  const { mutate: deleteFQA, isPending: isDeletingFQA } =
    FQAQueries.DeleteFqaQuery();
  const { data: ThisFQA, isLoading: isThisFQALoading } =
    FQAQueries.GetFqaByIdQuery(id);
  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<SetFQAType>({
    defaultValues: Initial_values,
  });

  const SubmitHandler = (data: SetFQAType) => {
    if (!data.question[0].value) {
      setError("question.0.value", { message: t("form.required") });
      return;
    }
    if (!data.question[1].value) {
      setError("question.1.value", { message: t("form.required") });
      return;
    }
    if (!data.answer[0].value) {
      setError("answer.0.value", { message: t("form.required") });
      return;
    }
    if (!data.answer[1].value) {
      setError("answer.1.value", { message: t("form.required") });
      return;
    }

    setFQA(
      {
        id: !!id ? id : undefined,
        question: data.question,
        answer: data.answer,
      },
      {
        onSuccess: () => {
          showSuccess(t("FQA.Added"));
          navigate(-1);
          reset();
        },
        onError: () => {
          showError("FQA.wrong");
        },
      }
    );
  };

  useEffect(() => {
    if (!!ThisFQA) {
      setValue("answer", ThisFQA.answer);
      setValue("question", ThisFQA.question);
    }
  }, [ThisFQA]);

  return {
    t,
    id,
    navigate,
    FQAs,
    isFQALoading,
    control,
    getValues,
    setValue,
    errors,
    handleSubmit,
    SubmitHandler,
    isSettingFQA,
    deleteFQA,
    isDeletingFQA,
    ThisFQA,
    isThisFQALoading,
  };
};
export default FQAHook;
