import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { handleCropImgType } from "../../interface/generic";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "../../helper/imgHelper";
import { useDebounceEffect } from "../../helper/imgHelper";
import "react-image-crop/dist/ReactCrop.css";
import Loading from "../Loading";
import { Button } from "@mui/material";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}
interface ICropImageProps {
  imageFile: File;
  setImageFile?: (file: File) => void;
  isCover?: boolean;
  onCrop: handleCropImgType;
  disableCropButton: boolean;
  aspect?: number;
  // setimgAfterCrop:(args:File) =>void
}

export default function App({
  imageFile,
  onCrop,
  setImageFile,
  aspect = 16 / 9,
  disableCropButton,
}: ICropImageProps) {
  const { t } = useTranslation();
  const [imgSrc, setImgSrc] = useState("");
  // const [outputFile, setOutputFile] = useState<File>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  // const [aspect, setAspect] = useState<number | undefined>(16 / 16);
  // const cropImg = "Components.CropImg";
  useEffect(() => {
    setImgSrc(window.URL.createObjectURL(imageFile));
  }, [imageFile]);
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useEffect(() => {
    if (previewCanvasRef.current) {
      previewCanvasRef.current.toBlob((blob) => {
        let file = new File([blob!], imageFile.name, { type: "image/jpeg" });
        // setOutputFile(file);
        setImageFile?.(file);
        // setimgAfterCrop(file)
      }, "image/jpeg");
    }
  }, []);

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  const cropImageHandler = () => {
    previewCanvasRef.current?.toBlob((blob) => {
      let file = new File([blob!], imageFile.name, { type: "image/jpeg" });
      //  setimgAfterCrop(file)
      //  console.log(URL.createObjectURL(file!))
      // console.log(URL.createObjectURL(file))
      onCrop(file);
    }, "image/jpeg");
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <div className="Crop-Controls">
        <Stack direction={"row"} spacing={2}>
          <TextField
            type="number"
            label="Scale"
            value={scale}
            disabled={!imgSrc}
            inputProps={{
              step: " 0.1",
            }}
            onChange={(e) => setScale(Number(e.target.value))}
          />

          <TextField
            type="number"
            label="Rotate"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </Stack>
      </div>
      {Boolean(imgSrc) && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => {
            setCompletedCrop(c);
          }}
          aspect={aspect}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{
              transform: `scale(${scale}) rotate(${rotate}deg)`,
              minHeight: "200px ",
              overflow: "scroll",
              maxHeight: "250px",
            }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      <div>
        {Boolean(completedCrop) && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: "1px solid black",
              objectFit: "contain",
              width: completedCrop?.width,
              height: completedCrop?.height,
            }}
          />
        )}
      </div>
      <Stack direction={"row"} spacing={2}>
        <Button
          disabled={disableCropButton}
          color="primary"
          variant="contained"
          onClick={cropImageHandler}
        >
          {disableCropButton ? <Loading size={20}/> : t(`form.crop`)}
        </Button>
      </Stack>
    </Stack>
  );
}
