import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Title from "../../Components/Title";
import SearchField from "../../Components/SearchField";
import { SalonQueries } from "../../API/Salon/SalonQueries";
import { API_SERVER_URL_For_Img } from "../../API/domain";
import { SalonTypeArray } from "../../API/Salon/type";
import img from "../../assets/1.jpg";
import Loading from "../../Components/Loading";
import Pagination from "../../Components/Pagination";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteCustome from "../../Components/DeleteCustome";
import { SalonApi } from "../../API/Salon/SalonApi";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import PopOver from "../../Components/Salon/PopOver";
import NoData from "../../Components/NoData";
const Salon = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [anchorEMployee, setAnchorElmpyee] = React.useState<HTMLElement | null>(
    null
  );
  const open = Boolean(anchorEMployee);
  const [anchorerService, setAnchorService] =
    React.useState<HTMLElement | null>(null);
  const openService = Boolean(anchorerService);
  const matches = useMediaQuery("(max-width:700px)");
  const navigate = useNavigate();
  const {
    data: salonData,
    isLoading,
    refetch,
    isFetching,
  } = SalonQueries.GetSalonAllQuery({
    Query: query,
    PageNumber: page,
  });
  return (
    <>
      {isLoading ? (
        <Box marginTop="150px">
          <Loading />
        </Box>
      ) : (
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
              onClick={() => navigate("add-salon")}
            >
              <AddIcon className="text-white-100" />
            </Fab>
          </Stack>
          <Stack direction={`${matches ? "column" : "row"}`} spacing={10}>
            <Title text={t("salon.title")} />
            <SearchField onSearch={(value) => setQuery(value)} value={query} />
          </Stack>
          {salonData?.data.length === 0 ? (
            <NoData />
          ) : (
            <Grid container spacing={4} sx={{ px: 2, mt: 3 }}>
              {salonData?.data.map((d, index) => (
                <Grid key={index} item xs={12} sm={6} lg={3}>
                  <Card elevation={7}>
                    <CardMedia
                      component={"img"}
                      height={150}
                      image={
                        d.logo ? `${API_SERVER_URL_For_Img}/${d.logo}` : img
                      }
                    />
                    <CardContent>
                      <Grid container flexDirection={"column"}>
                        <Stack flexDirection="row" gap="5px">
                          <Typography variant="caption">
                            {t("form.name")} :
                          </Typography>
                          <Typography variant="caption">{d.name}</Typography>
                        </Stack>
                        <Stack flexDirection="row" gap="5px">
                          <Typography variant="caption">
                            {t("form.description")} :
                          </Typography>
                          <Typography variant="caption">
                            {d.description}
                          </Typography>
                        </Stack>
                        <Stack flexDirection="row" gap="5px">
                          <Typography variant="caption">
                            {t("form.rate")}:
                          </Typography>
                          <Typography variant="caption">{d.rate}</Typography>
                        </Stack>
                        <Stack flexDirection="row" gap="5px">
                          <Typography variant="caption">
                            {t("salon.salonType")}:
                          </Typography>
                          <Typography variant="caption">
                            {
                              SalonTypeArray.find(
                                (type) => type.id === d.salonType
                              )?.name
                            }
                          </Typography>
                        </Stack>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <IconButton>
                        <EditIcon
                          onClick={() => navigate(`edit-salon/${d.id}`)}
                          color="primary"
                        />
                      </IconButton>
                      <DeleteCustome
                        refetch={refetch}
                        MassegeSuccess={t("salon.delete")}
                        onDelete={() => SalonApi.DeleteSalon(id)}
                        setId={() => setId(d?.id ?? "")}
                        userId={id ?? ""}
                      />
                      <IconButton
                        aria-owns={open ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
                        onMouseEnter={(event) =>
                          setAnchorElmpyee(event.currentTarget)
                        }
                        onMouseLeave={() => setAnchorElmpyee(null)}
                        onClick={() => navigate(`employee/${d.id}`)}
                      >
                        <ManageAccountsIcon />
                      </IconButton>
                      <IconButton
                        aria-owns={open ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
                        onMouseEnter={(event) =>
                          setAnchorService(event.currentTarget)
                        }
                        onMouseLeave={() => setAnchorService(null)}
                        onClick={() => navigate(`service/${d.id}`)}
                      >
                        <MiscellaneousServicesIcon />
                      </IconButton>
                      <PopOver
                        open={open}
                        anchor={anchorEMployee}
                        setAnchor={setAnchorElmpyee}
                        titel={t("emp.title")}
                      />
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
              <Pagination
                page={page}
                isFetching={isFetching}
                onPageChange={setPage}
                totalPages={salonData?.totalPages!}
              />
            </Grid>
          )}
        </Box>
      )}
    </>
  );
};
export default Salon;
