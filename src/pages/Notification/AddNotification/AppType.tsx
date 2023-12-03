import { FormControl, InputLabel, Select, Typography, MenuItem } from "@mui/material"
import { FC } from "react"
import { Control, Controller, FieldErrors, UseFormWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { AddNotificationType } from "../hooks/type"


const AppType: FC<{
    control: Control<AddNotificationType, any>,
    errors: FieldErrors<AddNotificationType>,
    watch: UseFormWatch<AddNotificationType>,
}> = ({
    control,
    errors,
    watch,
}) => {
        const { t } = useTranslation();

        return (
            <>
                <Controller
                    name="AppType"
                    control={control}
                    render={({ field }) => {
                        return (
                            <FormControl
                                fullWidth
                                sx={{ mt: '10px' }}
                            >
                                <InputLabel id="demo-simple-select-label" shrink>
                                    {t('Notification.AppType')}
                                </InputLabel>

                                <Select
                                    id="demo-simple-select"
                                    {...field}
                                    placeholder={t('Notification.AppType')}
                                    value={watch('AppType') ?? null}
                                    sx={{ maxWidth: '250px' }}

                                >
                                    <MenuItem value={1}>{t('Notification.Customer')}</MenuItem>
                                    <MenuItem value={2}>{t('Notification.Store')}</MenuItem>
                                    <MenuItem value={3}>{t('Notification.Driver')}</MenuItem>
                                </Select>
                            </FormControl >
                        )
                    }}
                />

                <Typography color={'error'} variant="subtitle2" sx={{ mt: '10px' }}> {errors.AppType?.message}</Typography >

            </>
        )
    }

export default AppType