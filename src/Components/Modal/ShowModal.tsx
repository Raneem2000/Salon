
// import Loading from "../../libs/Loading"
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AiFillEye } from "react-icons/ai";
import { SxProps, useMediaQuery } from "@mui/material";

type IProps = {
  id: string;
  setId: (id: string) => void;
  className?: string;
  title: string;
  width?: string;
  height?: string;
};

const ShowModal: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  id,
  setId,
  className,
  title,
  width="80vh"
}) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const style: SxProps = {
    width,
    marginInline: "auto",
    height: "600px",
    marginY: "auto",
  };
  const smallScreenStyle: SxProps = {
    ...style,
    marginInline: "0",
    width: "99vw",
  };
  const styleToUse: SxProps = useMediaQuery("(max-width: 550px)")
    ? smallScreenStyle
    : style;
  return (
    <>
      <AiFillEye
        onClick={() => {
          setOpen(true);
          setId(id);
        }}
        className={`text-blue-100  transition hover:text-blue-300  duration-75 text-[25px] cursor-pointer ml-2`}
      />

      <Dialog
        sx={styleToUse}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="w-full justify-center text-center gap-2">
          <DialogTitle id="responsive-dialog-title">
            <h1 className={`text-[25px] text-blue-100  `}>{title}</h1>
          </DialogTitle>

          <>
            <DialogContent className={`${className}`}>{children}</DialogContent>
          </>
        </div>
      </Dialog>
    </>
  );
};
export default ShowModal;
