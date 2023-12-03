
import { FC } from "react";
import { useNavigate } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Stack, Typography } from "@mui/material";
const TitleWithArrow: FC<{ title: string }> = ({ title }) => {
  const navigate = useNavigate();
  const currentLanguageCode = localStorage.getItem("lang");
  return (
    <>
       <Stack flexDirection={`row`} gap={`10px`}>
        {currentLanguageCode === "en" ? (
         <ArrowBackIcon 
         color="primary"
         sx={{
            marginTop:"10px"
         }}
         onClick={() => navigate(-1)}
         />
        ) : (
          <ArrowForwardIcon 
           color="primary"
          sx={{
            marginTop:"10px"
         }}
          onClick={() => navigate(-1)}
          />
        )}
        <Typography variant="h3"   color="#6870fa">
          {title}
        </Typography>
      </Stack>
    </>
  );
};
export default TitleWithArrow;
