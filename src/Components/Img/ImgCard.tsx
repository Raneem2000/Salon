import { AiOutlineClose } from "react-icons/ai";
import { CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
interface IImgCardProps {
  height?: number | string;
  imgSrc: string | undefined;
  title?: string;
  id?: string;
  action?: JSX.Element;
  onDeleteImg?: (
    value: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onDeleteImgIndex?: (
    value: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  description?: string;
  [key: string]: any;
}

const ImgCard = ({
  imgSrc,
  title,
  action,
  onDeleteImg,
  id,
  description,
  ...sx
}: IImgCardProps) => {
  // console.log(imgSrc)
  return (
    <Card >
      <CardHeader
        sx={{ textAlign: "center", color: "#072541", fontWeight: "500", padding: "5px" , ...sx }}
        action={
          onDeleteImg && (
            <IconButton color={"primary"} onClick={(e) => onDeleteImg(e)}>
              <AiOutlineClose />
            </IconButton>
          )
        }
        title={<Typography color={"primary.800"}>{title}</Typography>}
      />
      <CardMedia
        component='img'
        image={imgSrc}
        height='196'
        alt="image"
        sx={{ p: 1 }}
      />
    </Card>
  );
};

export default ImgCard;
