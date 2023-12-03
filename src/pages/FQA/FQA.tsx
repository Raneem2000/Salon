import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import Title from "../../Components/Title"
import FQAHook from "./hook/FQAHook"
import { Link } from "react-router-dom"
import Loading from "../../Components/Loading"
import EditIcon from '@mui/icons-material/Edit';
import DeleteFQA from "./DeleteFQA"
import { askForPermission } from "../../helper/askForPermission"
import NoData from "../../Components/NoData"


const FQA = () => {

    const { t, FQAs, isFQALoading } = FQAHook()
    const permission = askForPermission ('Fqa');

    if (isFQALoading) {
        return <Loading />
    }
    return (
        <>
            <Grid container justifyContent={'space-between'} sx={{ mt: 2 }} >
                <Grid container item xs={9}>
                    <Grid item sx={{ mx: 5 }}>
                        <Title text={t('FQA.title')} />
                    </Grid>
                </Grid>
                {permission.canAdd && (
                    <Grid container alignContent={'center'} justifyContent={'center'} item xs={3}>
                    <Link to={'addFQA'}>
                        <Button variant='contained'>
                            {t('FQA.Add')}
                        </Button>
                    </Link>
                </Grid>
                )}
                
            </Grid >
            {FQAs?.length === 0 ? <NoData/> : (
                <Grid container spacing={2} sx={{ p: 2 }}>
                {FQAs?.map((fqa, idx) => {
                    return (
                        <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                            <Card sx={{ p: 2 }}>
                                <CardContent>
                                    <Typography variant="body2">
                                        {t('FQA.enQuestion')} : {fqa?.question[0].value}
                                    </Typography>
                                    <Typography variant="body2">
                                        {t('FQA.arQuestion')} : {fqa?.question[1].value}
                                    </Typography>
                                    <Typography variant="body2">
                                        {t('FQA.enAnswer')} : {fqa?.answer[0].value}
                                    </Typography>
                                    <Typography variant="body2">
                                        {t('FQA.arAnswer')} : {fqa?.answer[1].value}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Grid container justifyContent={'end'}>
                                        {permission.canEdit && (
                                            <Link to={`editFQA/${fqa.id}`}>
                                            <Button>
                                                <EditIcon />
                                            </Button>
                                        </Link>
                                        )}
                                        
                                        {permission.canDelete && (<DeleteFQA id={fqa.id} /> )}
                                    </Grid>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            )}
            
        </>
    )
}

export default FQA