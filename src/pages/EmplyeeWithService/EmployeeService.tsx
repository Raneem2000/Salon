import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Title from "../../Components/Title";
import { useTranslation } from "react-i18next";
import EmployeeQureis from "../../API/Emplyee/EmployeeQureis";
import { useParams } from "react-router";
import { API_SERVER_URL_For_Img } from "../../API/domain";
import img from "../../assets/1.jpg";
import AddEmployeeService from "./AddEmployeeService";
import DeleteEmpService from "./DeleteEmpService";
import NoData from "../../Components/NoData";
const EmployeeService = () => {
  const { t } = useTranslation();
  const matches = useMediaQuery("(max-width:700px)");
  const { empId } = useParams();
  const { data } = EmployeeQureis.GetEmpDetailsServQuery(empId!);
  // console.log(data);
  return (
    <>
      <Box
        sx={{
          paddingInline: "40px",
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <AddEmployeeService />
        <Stack direction={`${matches ? "column" : "row"}`} spacing={10}>
          <Title text={t("serv.titleWithEmp")} />
        </Stack>
        {data?.length === 0 ? <NoData/> :
        (
          <Grid container spacing={4} sx={{ px: 2, mt: 3 }}>
          {data?.map((d, index) => (
            <Grid key={index} item xs={12} sm={6} lg={3}>
              <Card>
                <CardMedia
                  component={"img"}
                  height={150}
                  image={
                    d.coverImage
                      ? `${API_SERVER_URL_For_Img}/${d.coverImage}`
                      : img
                  }
                />
                <CardContent>
                  <Stack flexDirection="row" gap="5px">
                    <Typography variant="caption">
                      {t("form.name")} :
                    </Typography>
                    <Typography variant="caption">
                      {d.name.find((d2) => d2.key === "en")?.value}
                    </Typography>
                  </Stack>
                  <Stack flexDirection="row" gap="5px">
                    <Typography variant="caption">
                      {t("form.price")} :
                    </Typography>
                    <Typography variant="caption">{d.price}</Typography>
                  </Stack>
                  <Stack flexDirection="row" gap="5px">
                    <Typography variant="caption">
                      {t("form.offerPrice")} :
                    </Typography>
                    <Typography variant="caption">{d.offerPrice}</Typography>
                  </Stack>
                  <Stack flexDirection="row" gap="5px">
                    <Typography variant="caption">
                      {t("form.rate")} :
                    </Typography>
                    <Typography variant="caption">{d.rate}</Typography>
                  </Stack>
                </CardContent>
                <CardActions>
                  <DeleteEmpService id={d.id} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        )}
      </Box>
    </>
  );
};
export default EmployeeService;
