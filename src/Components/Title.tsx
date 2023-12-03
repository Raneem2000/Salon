import { Typography } from "@mui/material";
import { FC } from 'react'
const Title: FC<{ text: string }> = (props) => {

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          width: "fit-content",
          borderBottom: "2px solid #6870fa",
          marginTop: "10px",
          height: "40px"
        }}
      >
        {props.text}
      </Typography>
    </>
  );
};
export default Title;
