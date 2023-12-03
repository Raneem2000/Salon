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
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { BannerQuery } from "../../API/Banner/BannerQueries";
import Loading from "../../Components/Loading";
import Title from "../../Components/Title";
import AddIcon from "@mui/icons-material/Add";
import { API_SERVER_URL_For_Img } from "../../API/domain";
import img from "../../assets/1.jpg";
import moment from "moment";
import DeleteCustome from "../../Components/DeleteCustome";
import { BannerAPI } from "../../API/Banner/BannerApi";
import EditIcon from "@mui/icons-material/Edit";
import { askForPermission } from "../../helper/askForPermission";
import NoData from "../../Components/NoData";
import Pagination from "../../Components/Pagination";
const Banner = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(0);
  const [id, setId] = useState<string>("");
  const matches = useMediaQuery("(max-width:700px)");
  const navigate = useNavigate();
  const {
    data: bannerData,
    isLoading,
    refetch,
    isFetching,
  } = BannerQuery.GetAllBannerQuery({
    PageNumber: page,
  });

  const permission = askForPermission('Banner');

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
             {permission.canAdd && (
            <Stack flexDirection="row" justifyContent="end" marginInline="50px">
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => navigate("add-banner")}
              >
                  <AddIcon className="text-white-100" />
              </Fab>
            </Stack>
             )}
            <Stack direction={`${matches ? "column" : "row"}`} spacing={10}>
              <Title text={t("Banner.title")} />
            </Stack>
            {bannerData?.data.length === 0 ? <NoData/>  : (
            <Grid container spacing={4} sx={{ px: 2, mt: 3 }}>
              {bannerData?.data.map((d, index) => (
                <Grid key={index} item xs={12} sm={6} lg={3}>
                  <Card elevation={7}>
                    <CardMedia
                      component={"img"}
                      height={150}
                      image={
                        d.imageURl
                          ? `${API_SERVER_URL_For_Img}/${d.imageURl}`
                          : img
                      }
                    />
                    <CardContent>
                      <Grid container flexDirection={"column"}>
                        <Stack flexDirection="row" gap="5px">
                          <Typography variant="caption">
                            {t("form.fromDate")} :
                          </Typography>
                          <Typography variant="caption">
                            {moment(d.fromDate).format("MMM Do YY")}
                          </Typography>
                        </Stack>
                        <Stack flexDirection="row" gap="5px">
                          <Typography variant="caption">
                            {t("form.toDate")} :
                          </Typography>
                          <Typography variant="caption">
                            {moment(d?.fromDate).format("MMM Do YY")}
                          </Typography>
                        </Stack>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      {permission.canDelete && (
                        <DeleteCustome
                        refetch={refetch}
                        MassegeSuccess={t("salon.delete")}
                        onDelete={() => BannerAPI.DeleteBanner(id)}
                        setId={() => setId(d?.id ?? "")}
                        userId={id ?? ""}
                      />
                      )}
                      
                        {permission.canEdit && (
                          <IconButton>
                          <EditIcon
                            onClick={() => navigate(`edit-banner/${d.id}`)}
                            color="primary"
                          />
                        </IconButton>
                        )}
                        
                    </CardActions>
                  </Card>
                </Grid>
              ))}
              <Pagination
                            isFetching={isFetching}
                            onPageChange={setPage}
                            page={page}
                            totalPages={bannerData?.totalPages!}
                        />
            </Grid>
            )}
          </Box>
        </>
      )}
    </>
  );
};
export default Banner;
