import { Grid, Typography } from "@mui/material";
import UploadGenericImg from "../../../Components/Img/UploadGenericImg";
import ImgCard from "../../../Components/Img/ImgCard";
import ModalImgCrop from "../../../Components/Img/ModalImgCrop";
import { handleCropImgType } from "../../../interface/generic";
import CouponHook from "../hook/CouponHook";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { DEVELOPMENT_BASE_URL } from "../../../API/domain";
import { AddCouponType } from "../hook/type";
import { FieldErrors, UseFormSetValue } from "react-hook-form";


const CouponImage: FC<{
    img: string,
    setImg: Dispatch<SetStateAction<string>>,
    setValue: UseFormSetValue<AddCouponType>,
    errors: FieldErrors<AddCouponType>
}> = ({ img, setImg, setValue, errors }) => {

    const { t, mutateImg, UploadingImg } = CouponHook()
    const [Open, setOpen] = useState<boolean>(false)
    const [File, setFile] = useState<File | null>();

    const handleCropImg: handleCropImgType = async (imgFile) => {
        const formData = new FormData();
        formData.append("File", imgFile);
        mutateImg({
            File: imgFile,
            FileType: 2,
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
    return (
        <>
            <Grid container justifyContent={'center'}>
                <Grid item container justifyContent={'center'} sx={{ mt: 2 }} xs={12}>
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
                                // deleteImage(img)
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
        </>
    )
}

export default CouponImage