import { CategoryQuery } from "../../../API/Category/CategoryQueries"
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { AddCategoryType } from "./type";
import { FileQuery } from "../../../API/File/FileQueries";
import { showError, showSuccess } from "../../../libs/reactToastify";


const useCategoryHook = (pageNumber?: number, Query?: string) => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id;
    const { t } = useTranslation();
    const [query, setquery] = useState<string>('')
    const [img, setImg] = useState<string>("");


    const { setValue, register, clearErrors, control, formState: { errors }, handleSubmit, reset, setError, watch } = useForm<AddCategoryType>({
        defaultValues: {
            name: [
                {
                    key: 'ar',
                    value: ''
                },
                {
                    key: 'en',
                    value: ''
                }
            ],
            type: null
        }
    });


    // Debouncing Searching
    useEffect(() => {
        const time = setTimeout(() => {
            setquery(Query!);
        }, 500)
        return () => clearTimeout(time)
    }, [Query]);


    const {
        data: allCategories,
        isLoading: allCategoriesIsLoading,
    } = CategoryQuery.GetAllCategoryQuery({ PageNumber: pageNumber, Query: query })
    const { mutate: deleteImage } = FileQuery.DeleteFileQuery();
    const { mutate: mutateImg, isPending: UploadingImg } = FileQuery.SetFileQuery()
    const {
        isPending: isDeletingCategory,
        mutate: deleteCategory,
    } = CategoryQuery.DeleteBannerQuery();

    const { mutate: SetCategory, isPending: isCategoryLoading } = CategoryQuery.SetCategoryQuery();

    // to edit the category
    const { data: ThisCategory, isLoading: isThisCategoryLoading } = CategoryQuery.GetCategoryByIdQuery(id)


    //  submit the form
    const SubmitHandler = (data: AddCategoryType) => {
        clearErrors('image');
        if (data.name[0].value === '') {
            setError('name.0.value', { message: t('form.required') });
            return;
        }
        if (data.name[1].value === '') {
            setError('name.1.value', { message: t('form.required') });
            return;
        }
        if (data.type == null) {
            setError('type', { message: t('form.required') });
            return
        }

        if (img === '') {
            setError('image', { message: t('Category.imgRequired') })
            return
        }
        SetCategory({
            id: !id ? undefined : ThisCategory?.id,
            name: data.name,
            image: img,
            type: 0
        },
            {
                onSuccess: () => {
                    reset()
                    setImg('')
                    setValue('type', null)
                    showSuccess(!!id ? t('Category.added') : t('Category.edited'));
                    navigate(-1)
                },
                onError: () => {
                    showError(t('Category.wrong'))
                }
            })
    }

    // to clear img error
    useEffect(() => {
        if (img !== '') {
            clearErrors('image')
        }
    }, [img])

    return {
        allCategories,
        allCategoriesIsLoading,
        t,
        isDeletingCategory,
        deleteCategory,
        control,
        errors,
        navigate,
        register,
        deleteImage,
        mutateImg,
        UploadingImg,
        setValue,
        handleSubmit,
        isCategoryLoading,
        SetCategory,
        location,
        reset,
        setError,
        params,
        ThisCategory,
        watch,
        isThisCategoryLoading,
        SubmitHandler,
        img, setImg
    }
}

export default useCategoryHook