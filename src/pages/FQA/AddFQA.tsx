import { Button, Grid } from '@mui/material'
import Title from '../../Components/Title'
import FQAHook from './hook/FQAHook'
import FormTextField from '../../Components/Form/FormTextField'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loading from '../../Components/Loading'


const AddFQA = () => {

    const { t, id, control, handleSubmit, SubmitHandler, isSettingFQA, navigate, isThisFQALoading } = FQAHook();

    if (isThisFQALoading) {
        return <Loading />
    }

    return (
        <>
            <Grid container justifyContent={'space-between'} sx={{ mt: 2 }} >
                <Grid container item xs={9}>
                    <Button onClick={() => { navigate(-1) }}>
                        <ArrowBackIcon />
                    </Button>
                    <Grid item sx={{ mx: 5 }}>
                        <Title text={id ? t('FQA.Edit') : t('FQA.Add')} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container sx={{ p: 3 }}>
                <form style={{ width: '100%' }} onSubmit={handleSubmit(SubmitHandler)}>
                    <Grid container spacing={2}>
                        <Grid xs={12} item md={6}>
                            <FormTextField
                                name='question.0.value'
                                control={control}
                                shrink
                                label={t('FQA.enQuestion')}
                                placeholder={t('FQA.enQuestion')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormTextField
                                name='question.1.value'
                                control={control}
                                shrink
                                label={t('FQA.arQuestion')}
                                placeholder={t('FQA.arQuestion')}
                            />
                        </Grid>
                        <Grid xs={12} item md={6}>
                            <FormTextField
                                name='answer.0.value'
                                control={control}
                                shrink
                                label={t('FQA.enQuestion')}
                                placeholder={t('FQA.enQuestion')}
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormTextField
                                name='answer.1.value'
                                control={control}
                                shrink
                                multiline
                                rows={4}
                                label={t('FQA.arQuestion')}
                                placeholder={t('FQA.arQuestion')}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={'end'} sx={{ p: 2 }} >
                        <Button type='submit' variant='contained' disabled={isSettingFQA}>
                            {t('form.submit')}
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </>
    )
}

export default AddFQA