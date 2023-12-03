import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useState } from 'react'
import Title from '../../Components/Title';
import SearchField from '../../Components/SearchField';
import CouponHook from './hook/CouponHook';
import { Link } from 'react-router-dom';
import Loading from '../../Components/Loading';
import DeleteCoupon from './DeleteCoupon';
import Pagination from '../../Components/Pagination';
import { DEVELOPMENT_BASE_URL } from '../../API/domain';
import EditIcon from '@mui/icons-material/Edit';
import { askForPermission } from '../../helper/askForPermission';
import NoData from '../../Components/NoData';


const Coupon = () => {
  const [PageNumber, setPageNumber] = useState<number>(0);
  const [Search, setSearch] = useState<string>('')
  const {
    Coupons,
    isCouponsLoading,
    t, navigate
  } = CouponHook(Search, PageNumber)

  const permission = askForPermission ('Coupon');
  
  return (
    <>
      <Grid container justifyContent={"space-between"} sx={{ mt: 2 }}>
        <Grid container item xs={9}>
          <Grid item sx={{ mx: 5 }}>
            <Title text={t("Coupon.title")} />
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
          <Link to={"addCoupon"}>
            <Button variant="contained">{t("Coupon.add")}</Button>
          </Link>
        </Grid>
        )}
      </Grid>

      {isCouponsLoading ? (
        <Loading />
      ) : (
        <>
        {Coupons?.data.length === 0 ? <NoData/> : (
          <Grid container spacing={2} sx={{ mt: 1, px: 2 }}>
            {Coupons?.data.map((coupon, idx) => {

              return (
                <>
                  <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
                    <Card>
                      <CardMedia
                        component={"img"}
                        alt="Coupon image"
                        image={`${DEVELOPMENT_BASE_URL}/${coupon.image}`}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                        >
                          {t("Coupon.name")} : {coupon.name ?? "----"}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                        >
                          {t("Coupon.code")} : {coupon.code ?? "----"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {t("form.fromDate")} : {coupon.fromDate}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {t("Coupon.value")} : {coupon.value ?? '----'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {t("Coupon.percentage")} : {coupon.percentage ?? '----'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {t("form.toDate")} : {coupon.toDate}
                        </Typography>
                        <Typography
                          sx={{ mt: 1 }}
                          variant="body1"
                          color={coupon.isExpired ? "red" : "green"}
                        >
                          {coupon.isExpired
                            ? t("Coupon.Expired")
                            : t("Coupon.active")}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Grid container justifyContent={"end"}>
                          {permission.canEdit && (
                            <Button onClick={() => navigate(`editCoupon/${coupon.id}`)}>
                            <EditIcon />
                            </Button>
                          )}
                          {permission.canDelete && (
                            <DeleteCoupon id={coupon.id} />
                          )}
                        </Grid>
                      </CardActions>
                    </Card>
                  </Grid>
                </>
              );
            })}
                      <Pagination
            isFetching={isCouponsLoading}
            totalPages={Coupons?.totalPages!}
            page={Coupons?.pageNumber!}
            onPageChange={setPageNumber}
          />
          </Grid>
          )}

        </>
      )}
    </>
  );
};

export default Coupon;
