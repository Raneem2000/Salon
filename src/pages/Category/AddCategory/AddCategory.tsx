import { Button, Grid, Typography } from "@mui/material"
import useCategoryHook from "../hooks/useCategoryHook"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Title from "../../../Components/Title";
import UploadGenericImg from "../../../Components/Img/UploadGenericImg";
import { ChangeEvent, useEffect, useState } from "react";
import ImgCard from "../../../Components/Img/ImgCard";
import { DEVELOPMENT_BASE_URL } from "../../../API/domain";
import ModalImgCrop from "../../../Components/Img/ModalImgCrop";
import { handleCropImgType } from "../../../interface/generic";
import Loading from "../../../Components/Loading";
import NamesCategory from "./NamesCategory";
import CategoryType from "./CategoryType";



const AddCategory = () => {
    const [File, setFile] = useState<File | null>();
    const [Open, setOpen] = useState(false);
    const {
        t,
        navigate,
        control,
        deleteImage,
        mutateImg,
        UploadingImg,
        setValue,
        handleSubmit,
        isCategoryLoading,
        img,
        setImg,
        errors, location,
        ThisCategory, isThisCategoryLoading,
        SubmitHandler

    } = useCategoryHook();
    const isAddCategory = location.pathname === '/category/addCategory'


    useEffect(() => {
        if (!isAddCategory && !!ThisCategory) {
            setValue('name', ThisCategory?.name);
            setValue('type', ThisCategory.type)
            setImg(ThisCategory.imageUrl)
        }
    }, [ThisCategory])




    const handleCropImg: handleCropImgType = async (imgFile) => {
        const formData = new FormData();
        formData.append("File", imgFile);
        mutateImg({
            File: imgFile,
            FileType: 0,
        }, {
            onSuccess: (data) => {
                setImg(data);
                setValue('image', img)
                setOpen(false);
            }
        })
    };

    const imageHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) return;
        const file = event.target.files[0];
        setFile(file);
        setOpen(!Open);
    }

    if (!isAddCategory && isThisCategoryLoading) {
        return <Loading />
    }


    return (
        <>

            <Grid container justifyContent={'space-between'} sx={{ mt: 2 }} >
                <Grid container item xs={9}>
                    <Grid item sx={{ mx: 5 }}>
                        <Button sx={{ mt: 2, ml: 2 }} variant="outlined" onClick={() => navigate(-1)} >
                            <ArrowBackIcon />
                        </Button>
                    </Grid>
                    <Title text={isAddCategory ? t('Category.add') : t('Category.edit')} />
                </Grid>

            </Grid >
            <form action="" onSubmit={handleSubmit(SubmitHandler)} style={{ padding: 20 }}>

                <Grid spacing={2} justifyContent={'center'} container sx={{ mt: 2 }}>

                    <NamesCategory control={control} errors={errors} />

                    <CategoryType control={control} errors={errors} />

                    <Grid container justifyContent={'center'} item xs={12}>
                        {img === "" ? (
                            <Grid item container justifyContent={'center'} xs={3}>
                                <UploadGenericImg
                                    onFileUpload={imageHandler}
                                    buttonText={t("form.upLoadImg")}
                                />
                            </Grid>
                        ) : (
                            <ImgCard
                                imgSrc={`${DEVELOPMENT_BASE_URL}/${img}`}
                                onDeleteImg={() => {
                                    deleteImage(img)
                                    setImg("");
                                }}
                            />
                        )}

                        {File && (
                            <ModalImgCrop
                                disableCropButton={UploadingImg}
                                open={Open}
                                onClose={setOpen}
                                handleCropImg={handleCropImg}
                                imageFile={File}
                                aspect={1 / 1}
                            />
                        )}
                    </Grid>
                    <Typography color={'error'}>
                        {errors.image?.message}
                    </Typography>

                </Grid>
                <Grid sx={{ mt: 2 }} container justifyContent={'center'}>
                    <Button type="submit" variant="contained" disabled={isCategoryLoading}>
                        {t('form.submit')}
                    </Button>
                </Grid>
            </form>
        </>
    )
}

export default AddCategory