import { useForm } from "react-hook-form"
import { LoginType } from "./type";
import { CpManagementQueries } from "../../../API/CpManagement/CpManagementQueries";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const useLogin = () => {

    const { control, register, handleSubmit, getValues, formState: { errors, isValid } } = useForm<LoginType>();
    const { data, isPending, mutate } = CpManagementQueries.LogInQuery()
    const navigate = useNavigate()
    const { t } = useTranslation();

    return {
        control,
        register,
        handleSubmit,
        getValues,
        errors,
        isValid,
        mutate,
        isPending,
        data,
        navigate,
        t
    }
}

export default useLogin