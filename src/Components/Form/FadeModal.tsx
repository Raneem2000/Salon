
import { Backdrop, Card, Fade, IconButton, Modal, useMediaQuery } from "@mui/material";
import { SxProps } from "@mui/material/styles";
import { FC, PropsWithChildren } from "react";
interface ModalProps {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  width?: number | string;
  height?: string | number;
  padding?: number;
  keepMounted?: boolean;
  pt?: number;
}

const FadeModal: FC<PropsWithChildren<ModalProps>> = ({
  open,
  // setOpen,
  onClose,
  children,
  width = 400,
  height,
}) => {
  const handleClose = () => {
    onClose(false);
    // if (setOpen) {
    //   setOpen(false);
    // }
  };

  const style: SxProps = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width,
    height,
    p: "10px", 
    overflow: "hidden",
    borderRadius: "10px",
    border: "1px solid #666",
    pt: "10px",
  };
  const smallScreenStyle: SxProps = {
    ...style,
    width: "80vw", 
    height,
    p: "5vw", 
    pt: "2vw", 
  };
  const styleToUse: SxProps = useMediaQuery("(max-width: 550px)") ? smallScreenStyle : style;

  return (
    <Modal
      // keepMounted={keepMounted}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
      data-test={"modal"}
    >
      <Fade in={open} className={"map-container"}>
        <Card sx={styleToUse} data-cy="fade-modal">
          <IconButton
            sx={{
              position: "absolute",
              top: 9,
              right: 9,
            }}
            onClick={handleClose}
            data-cy="close-modal-button"
          >
    
          </IconButton>

          {children}
        </Card>
      </Fade>
    </Modal>
  );
};
export default FadeModal;
