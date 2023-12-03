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
import AddIcon from "@mui/icons-material/Add";
import Title from "../../Components/Title";
import SearchField from "../../Components/SearchField";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ServiceQueries } from "../../API/Service/ServiceQueries";
import Loading from "../../Components/Loading";
import { API_SERVER_URL_For_Img } from "../../API/domain";
import img from "../../assets/1.jpg";
import Pagination from "../../Components/Pagination";
import DeleteCustome from "../../Components/DeleteCustome";
import { ServiceApi } from "../../API/Service/ServiceApi";
import EditIcon from "@mui/icons-material/Edit";
import NoData from "../../Components/NoData";
const Service = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [id, setId] = useState<string>("");
  const matches = useMediaQuery("(max-width:700px)");
  const navigate = useNavigate();
  const { salonId } = useParams();
  const {
    data: serviceData,
    refetch,
    isLoading,
    isFetching,
  } = ServiceQueries.GetServiceDetailsQuery({
    salonId: salonId!,
    PageNumber: page,
    Query: query,
  });
  //   console.log(serviceData);
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
              onClick={() => navigate("add-service")}
            >
              <AddIcon className="text-white-100" />
            </Fab>
          </Stack>
          <Stack direction={`${matches ? "column" : "row"}`} spacing={10}>
            <Title text={t("serv.title")} />
            <SearchField onSearch={(value) => setQuery(value)} value={query} />
          </Stack>
          {serviceData?.data.length === 0 ? <NoData/> : (
            <Grid container spacing={4} sx={{ px: 2, mt: 3 }}>
            {serviceData?.data.map((d, index) => (
              <Grid key={index} item xs={12} sm={6} lg={3}>
                <Card elevation={7}>
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
                    <Grid container flexDirection={"column"}>
                      <Stack flexDirection="row" gap="5px">
                        <Typography variant="caption">
                          {t("form.name")} :
                        </Typography>
                        <Typography variant="caption">{d.name.find((d)=>d.key === 'en')?.value}</Typography>
                      </Stack>
                      <Stack flexDirection="row" gap="5px">
                        <Typography variant="caption">
                          {t("form.price")} :
                        </Typography>
                        <Typography variant="caption">{d.price}</Typography>
                      </Stack>
                      <Stack flexDirection="row" gap="5px">
                        <Typography variant="caption">
                          {t("form.offerPrice")}:
                        </Typography>
                        <Typography variant="caption">
                          {d.offerPrice}
                        </Typography>
                      </Stack>
                      <Stack flexDirection="row" gap="5px">
                        <Typography variant="caption">
                          {t("form.rate")}:
                        </Typography>
                        <Typography variant="caption">{d.rate}</Typography>
                      </Stack>
                    </Grid>
                  </CardContent>
                  <CardActions>
                  <IconButton>
                      <EditIcon
                        onClick={() => navigate(`edit-service/${d.id}`)}
                        color="primary"
                      />
                    </IconButton>
                  <DeleteCustome
                      refetch={refetch}
                      MassegeSuccess={t("serv.delete")}
                      onDelete={() => ServiceApi.DeleteService(id)}
                      setId={() => setId(d?.id ?? "")}
                      userId={id ?? ""}
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))}
            <Pagination
            page={page}
            isFetching={isFetching!}
            onPageChange={setPage}
            totalPages={serviceData?.totalPages!}
          />
          </Grid>
          )}
        </Box>
      )}
    </>
  );
};
export default Service;
