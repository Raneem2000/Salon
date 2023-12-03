import { Grid, Typography } from "@mui/material";
import SignalWifiBadIcon from '@mui/icons-material/SignalWifiBad';
import { useTranslation } from "react-i18next";

function NoData() {
  const {t} = useTranslation();

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }}>
      {/* <img src={NODataIMG} alt="NO Data Found" /> */}
      <Grid container justifyContent={'center'} alignContent={'space-around'}>

        <Grid item xs={12} container justifyContent={'center'} alignContent={'center'}>
          <SignalWifiBadIcon sx={{ width: 0.5, height: 0.4 }} />
        </Grid>
        <Typography variant="h4">
          {t('NoData.noData')}
        </Typography>
      </Grid>
    </div>

  )
}

export default NoData