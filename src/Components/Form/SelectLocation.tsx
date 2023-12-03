import {
  Button,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
// import { TransitionProps } from "@mui/material/transitions";
import FadeModal from "./FadeModal";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
const SelectLocation: FC<{
  setValue: UseFormSetValue<any>;
  error?: string;
}> = ({ setValue, error }) => {
  // const Transition = React.forwardRef(function Transition(
  //   props: TransitionProps & {
  //     children: React.ReactElement<any, any>;
  //   },
  //   ref: React.Ref<unknown>
  // ) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  const [openActionModel, setOpenActionModel] = useState(false);
  const [position, setPosition] = useState<any>();
  const { t } = useTranslation();
  const handleMapClick = (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setPosition({ lat, lng });
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBkHcnl50GF1tiER0QI7pIoBoIa_1BVgG4",
    libraries: import.meta.env.LIP,
  });
  const handleAddLocation = () => {
    if (position) {
      // console.log("Latitude:", position.lat);
      // console.log("Longitude:", position.lng);
      setValue("latitude", position.lat);
      setValue("longitude", position.lng);
      setOpenActionModel(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpenActionModel(true)}
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          height: "100%",
          background: "#ff5722",
          "&:hover": {
            background: "#ff8a65", // يتم تعيين اللون الحالي هنا
          },
        }}
      >
        {t("form.selectLocation")}
        <AddLocationAltIcon sx={{ marginInline: "3px" }} />
      </Button>
      {error && (
        <Typography color="#FF5252" marginY="5px" fontSize="15px">
          {t("form.required")}
        </Typography>
      )}
      <FadeModal
        width={700}
        open={openActionModel}
        onClose={setOpenActionModel}
      >
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "100%" }}
            center={{
              lat: parseFloat("36.2137678"),
              lng: parseFloat("37.1415791"),
            }}
            zoom={10}
            onClick={handleMapClick}
          >
            {position && <Marker position={position} />}
          </GoogleMap>
        )}
        <Button
          sx={{
            color: "#fff",
            marginTop: "15px",
          }}
          onClick={handleAddLocation}
          variant="contained"
          color="primary"
          fullWidth
        >
          {t("form.addLocation")}
        </Button>
      </FadeModal>
    </>
  );
};
export default SelectLocation;
