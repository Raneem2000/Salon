import FadeModal from "../Modal/FadeModal";
import CropImg from "./CropImg"
import { handleCropImgType } from "../../interface/generic";
import React from "react";
interface ICropImageModalProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  imageFile: File;
  isCover?: boolean;
  handleCropImg: handleCropImgType;
  disableCropButton: boolean;
  aspect?: number;
  // setimgAfterCrop?:(args:File) =>void
}
const ModalImgCrop = ({
  open,
  onClose,
  imageFile,
  handleCropImg,
  disableCropButton,
  aspect,

}: ICropImageModalProps) => {

  return (
    <FadeModal open={open} onClose={onClose} width={500}>
      <CropImg
        imageFile={imageFile}
        onCrop={handleCropImg}
        aspect={aspect}
        disableCropButton={disableCropButton}
      />
    </FadeModal>
  );
};

export default ModalImgCrop;
