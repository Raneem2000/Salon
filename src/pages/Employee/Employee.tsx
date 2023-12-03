import { useNavigate, useParams } from "react-router";
import EmployeeQureis from "../../API/Emplyee/EmployeeQureis";
import { Box, Stack } from "@mui/system";
import Loading from "../../Components/Loading";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Title from "../../Components/Title";
import { API_SERVER_URL_For_Img } from "../../API/domain";
import img from "../../assets/1.jpg";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import DeleteCustome from "../../Components/DeleteCustome";
import { EmployeeApi } from "../../API/Emplyee/EmployeeApi";
import EditIcon from "@mui/icons-material/Edit";
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import NoData from "../../Components/NoData";
import PopOver from "../../Components/Salon/PopOver";
const Employee = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { salonId } = useParams();
  const [id, setId] = useState<string>("");
  const [anchorerService, setAnchorService] =
    React.useState<HTMLElement | null>(null);
  const openService = Boolean(anchorerService);
  const {
    data: EmployeeData,
    isLoading,
    refetch,
  } = EmployeeQureis.GetEmployeAllQuery(salonId!);
  //   console.log(salonId)
  //   console.log(EmployeeData);
  return (
    <>
      {isLoading ? (
        <Box marginTop="150px">
          <Loading />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              paddingInline: "40px",
              marginTop: "30px",
              textAlign: "center",
            }}
          >
            <Stack flexDirection="row" justifyContent="end" marginInline="50px">
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => navigate("add-employee")}
              >
                <AddIcon className="text-white-100" />
              </Fab>
            </Stack>
            <Title text={t("emp.title")} />
            {EmployeeData?.length === 0 ? <NoData/> :
            (
            <Grid container spacing={4} sx={{ px: 2, mt: 3 }}>
              {EmployeeData?.map((d, index) => (
                <Grid key={index} item xs={12} sm={6} lg={3}>
                  <Card elevation={7}>
                    <CardMedia
                      component={"img"}
                      height={150}
                      image={
                        d.image ? `${API_SERVER_URL_For_Img}/${d.image}` : img
                      }
                    />
                    <CardContent>
                      <Grid container flexDirection={"column"}>
                        <Stack flexDirection="row" gap="5px">
                          <Typography variant="caption">
                            {t("form.name")} :
                          </Typography>
                          <Typography variant="caption">{d.empName}</Typography>
                        </Stack>
                        <Stack flexDirection="row" gap="5px">
                          <Typography variant="caption">
                            {t("form.rate")} :
                          </Typography>
                          <Typography variant="caption">{d.rate}</Typography>
                        </Stack>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <IconButton>
                        <EditIcon
                          onClick={() => navigate(`edit-employee/${d.id}`)}
                          color="primary"
                        />
                      </IconButton>
                      <DeleteCustome
                        refetch={refetch}
                        MassegeSuccess={t("emp.delete")}
                        onDelete={() => EmployeeApi.DeleteEmployee(id)}
                        setId={() => setId(d?.id ?? "")}
                        userId={id ?? ""}
                      />
                      <IconButton
                        aria-owns={
                          openService ? "mouse-over-popover" : undefined
                        }
                        aria-haspopup="true"
                        onMouseEnter={(event) =>
                          setAnchorService(event.currentTarget)
                        }
                        onMouseLeave={() => setAnchorService(null)}
                        onClick={() => navigate(`employeeService/${d.id}`)}
                      >
                        <MiscellaneousServicesIcon />
                      </IconButton>
                      <PopOver
                        open={openService}
                        anchor={anchorerService}
                        setAnchor={setAnchorService}
                        titel={t("serv.title")}
                      />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            )}
            
          </Box>
        </>
      )}
    </>
  );
};
export default Employee;
