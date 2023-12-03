import { Grid, Typography } from "@mui/material"
import { FC } from "react"
import { Control, FieldErrors, UseFormRegister } from "react-hook-form"
import { AddNotificationType } from "../hooks/type"
import { useTranslation } from "react-i18next"
import FormTextField from "../../../Components/Form/FormTextField"

const TitleAndBody: FC<{
    register: UseFormRegister<AddNotificationType>
    errors: FieldErrors<AddNotificationType>,
    control: Control<AddNotificationType, any>

}> = ({
    control
}) => {
        const { t } = useTranslation()

        return (
            <>
                <Typography variant="h6" sx={{ mb: '10px' }}>{t('Notification.Title')}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>

                        <FormTextField
                            control={control}
                            name="title.0.value"
                            label={t('Notification.arTitle')}
                            placeholder={t('Notification.arTitle')}
                            shrink
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>

                        <FormTextField
                            control={control}
                            name="title.1.value"
                            label={t('Notification.enTitle')}
                            placeholder={t('Notification.enTitle')}
                            shrink
                        />
                    </Grid>
                </Grid>


                <Typography variant="h6" sx={{ mb: '10px' }}>{t('Notification.Body')}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>

                        <FormTextField
                            control={control}
                            name="body.0.value"
                            label={t('Notification.arBody')}
                            placeholder={t('Notification.arBody')}
                            rows={4}
                            multiline
                            shrink
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>

                        <FormTextField
                            control={control}
                            name="body.1.value"
                            label={t('Notification.enBody')}
                            placeholder={t('Notification.enBody')}
                            rows={4}
                            multiline
                            shrink
                        />
                    </Grid>
                </Grid>

            </>
        )
    }

export default TitleAndBody