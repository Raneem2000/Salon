import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Loading from "../../Components/Loading";
import Pagination from "../../Components/Pagination";
import useCategoryHook from "./hooks/useCategoryHook";
import { useState } from "react";
import { DEVELOPMENT_BASE_URL } from "../../API/domain";
import DeleteCategory from "./DeleteCategory";
import SearchField from "../../Components/SearchField";
import Title from "../../Components/Title";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { askForPermission } from "../../helper/askForPermission";

const Category = () => {
  const [PageNumber, setPageNumber] = useState(0);
  const [Search, setSearch] = useState<string>("");

  const {
    allCategories,
    allCategoriesIsLoading,
    t,
    location, navigate
  } = useCategoryHook(PageNumber, Search)
  
  const permission = askForPermission("Category");

  return (
    <>
      <Grid container justifyContent={"space-between"} sx={{ mt: 2 }}>
        <Grid container item xs={9}>
          <Grid item sx={{ mx: 5 }}>
            <Title text={t("Category.title")} />
          </Grid>
          <SearchField value={Search} onSearch={setSearch} />
        </Grid>
        {permission.canAdd && (
          <Grid
          container
          alignContent={"center"}
          justifyContent={"center"}
          item
          xs={3}
        >
          <Link to={`${location.pathname}/addCategory`}>
            <Button variant="contained">{t("Category.add")}</Button>
          </Link>
        </Grid>
        )}
        
      </Grid>
      {allCategoriesIsLoading ? (
        <Loading />
      ) : (
        <>
          <Grid container spacing={4} sx={{ px: 2, mt: 3 }}>
            {allCategories?.data.map((category, idx) => {
              return (
                <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                  <Card>
                    <CardMedia
                      component={"img"}
                      alt="Category image"
                      image={`${DEVELOPMENT_BASE_URL}/${category.imageUrl}`}
                    />
                    <CardContent>
                      <Grid container flexDirection={"column"}>
                        {category.name.map((name, idx) => {
                          return (
                            <Typography key={idx} variant="caption">
                              {name.key === "ar"
                                ? t("form.arName")
                                : t("form.enName")}{" "}
                              : {name.value}
                            </Typography>
                          );
                        })}
                        <Typography variant="caption">
                          {t("Category.type")} : {category.type === 0 ? t('Category.male') : t('Category.female')}
                        </Typography>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      {permission.canEdit && (
                        <Button onClick={() => navigate(`editCategory/${category.id}`)}>
                        <EditIcon />
                      </Button>
                      )}
                      {permission.canDelete && (
                        <DeleteCategory id={category.id} />
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}

            <Pagination
              page={PageNumber}
              onPageChange={setPageNumber}
              isFetching={allCategoriesIsLoading}
              totalPages={allCategories?.totalPages!}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default Category;
