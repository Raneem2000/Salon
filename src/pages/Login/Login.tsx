import { Button, Grid, Paper, TextField, Typography } from "@mui/material"
import useLogin from "./hooks/useLogin"
import { SubmitHandler } from 'react-hook-form'
import { LoginType } from "./hooks/type"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import logo from '../../assets/react.svg'
import { useDispatch } from "react-redux";
import { PermissionActions } from "../../libs/redux/permissions-slice";

const Login = () => {

  const {
    register,
    handleSubmit,
    errors,
    mutate,
    isPending,
    navigate,
    t
  } = useLogin()

  // if(localStorage.getItem('token')){
  //   navigate('/')
  // }
  const dispatch = useDispatch();
  const submitHandler: SubmitHandler<LoginType> = (data) => {
    mutate(data, {
      onError: () => console.log('error'),
      onSuccess: (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem("RoleId",data.roleId)
        dispatch(PermissionActions.setRoleId(data.roleId))
        navigate('/')
      }
    })
  }
  //background: '#dde5f4'

  return (
    <>
      <Grid sx={{ width: '100vw', height: '100vh' }}>
        <Grid container justifyContent={'center'} alignContent={'center'} sx={{ background: 'linear-gradient(to right , white 50%, #00308F 50% 100%)', width: '100%', height: '100%' }}>

          <Grid item >

            <Paper sx={{ padding: 5 }}>
              <Grid container flexDirection={'column'} justifyContent={'center'} alignContent={'center'}>
                <Typography variant="h3">
                  Salon
                </Typography>

                <img src={logo} alt="" />
              </Grid>

              <Grid container alignContent={'center'} justifyContent={'center'}>
                <Typography sx={{ mb: '20px', mt: '40px' }} variant="h5"  >
                  {t('form.login')}
                </Typography>
              </Grid>

              <form onSubmit={handleSubmit(submitHandler)}>


                <Grid container flexDirection={'column'} justifyContent={'space-around'} alignContent={'center'}>

                  <TextField
                    prefix="dsa"
                    label={t('form.userName')}
                    placeholder={t('form.userName')}
                    variant="outlined"
                    sx={{ mt: '10px' }}
                    {...register('username', {
                      required: t('form.required'),
                    })}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    InputProps={{
                      startAdornment: <AccountCircleIcon sx={{ mx: '10px' }} />
                    }}
                  />

                  <TextField
                    label={t('form.password')}
                    placeholder={t('form.password')}
                    variant="outlined"
                    sx={{ mt: '10px' }}
                    type="password"
                    {...register('password', {
                      required: t('form.required')
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      startAdornment: <KeyIcon sx={{ mx: '10px' }} />
                    }}
                  />
                  <Button disabled={isPending} sx={{ mt: '10px' }} variant="outlined" type="submit">
                    {t('form.submit')}
                  </Button>
                </Grid>
              </form>

            </Paper>
          </Grid>
        </Grid>
      </Grid >
    </>
  )
}

export default Login
