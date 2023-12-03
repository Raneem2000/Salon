import {
  Box,
  Card,
  CardActions,
  CardContent,
  Fab,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Title from "../../Components/Title";
import { VersionQueries } from "../../API/Version/VersionQueries";
import Loading from "../../Components/Loading";
import { useTranslation } from "react-i18next";
import { AppTypeArray } from "../../API/Version/type";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import DeleteCustome from "../../Components/DeleteCustome";
import { VersionApi } from "../../API/Version/VersionApi";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { askForPermission } from "../../helper/askForPermission";
import NoData from "../../Components/NoData";
const Version = () => {
  const [id, setId] = useState<string>();
  const {
    data: versionData,
    isLoading,
    refetch,
  } = VersionQueries.GetVersionAllQuery();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const permission = askForPermission('Version');
  
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
          {permission.canAdd && (
            <Stack flexDirection="row" justifyContent="end" marginInline="50px">
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => navigate("add-version")}
            >
              <AddIcon className="text-white-100" />
            </Fab>
          </Stack>
          )}
          
          <Stack direction={`row`} spacing={10}>
            <Title text={t("Version.title")} />
          </Stack>
        {versionData?.length === 0 ? <NoData/> : (
            <Grid container spacing={4} sx={{ px: 2, mt: 3 }}>
            {versionData?.map((d, index) => (
              <Grid key={index} item xs={12} sm={6} lg={4}>
                <Card elevation={5}>
                  <CardContent>
                    <Grid container flexDirection={"column"} gap={`10px`}>
                      <Stack flexDirection="row" gap="5px">
                        <Typography variant="body1">
                          {t("form.title")} :
                        </Typography>
                        <Typography variant="body1">{d.title}</Typography>
                      </Stack>
                      <Stack flexDirection="row" gap="5px">
                        <Typography variant="body1">
                          {t("form.body")} :
                        </Typography>
                        <Typography variant="body1">{d.body}</Typography>
                      </Stack>
                      <Stack flexDirection="row" gap="5px">
                        <Typography variant="body1">
                          {t("form.iosVersionName")} :
                        </Typography>
                        <Typography variant="body1">
                          {d.iosVersionName}
                        </Typography>
                      </Stack>
                      <Stack flexDirection="row" gap="5px">
                        <Typography variant="body1">
                          {t("form.androidVersionName")} :
                        </Typography>
                        <Typography variant="body1">
                          {d.androidVersionName}
                        </Typography>
                      </Stack>
                      <Stack flexDirection="row" gap="5px">
                        <Typography variant="body1">
                          {t("form.appType")} :
                        </Typography>
                        <Typography variant="body1">
                          {AppTypeArray.find((d2) => d2.id === d.appType)?.name}
                        </Typography>
                      </Stack>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    {permission.canEdit && (
                      <IconButton>
                      <EditIcon
                        onClick={() => navigate(`edit-version/${d.id}`)}
                        color="primary"
                      />
                    </IconButton>
                    )}
                    {permission.canDelete && (
                      <DeleteCustome
                      refetch={refetch}
                      MassegeSuccess={t("Version.delete")}
                      onDelete={() => VersionApi.DeleteVersion(id!)}
                      setId={() => setId(d?.id!)}
                      userId={id ?? ""}
                    />
                    )}
                    
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          )}
          
        </Box>
      )}
    </>
  );
};
export default Version;
