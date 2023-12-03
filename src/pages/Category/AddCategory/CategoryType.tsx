import { FormControl, Grid, InputLabel, Select, Typography, MenuItem } from '@mui/material'
import React from 'react'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import useCategoryHook from '../hooks/useCategoryHook'
import { AddCategoryType } from '../hooks/type'

const CategoryType: React.FC<{
    control: Control<AddCategoryType, any>,
    errors: FieldErrors<AddCategoryType>
}> = ({
    control,
    errors
}) => {

        const { t } = useCategoryHook()

        return (
            <>
                <Grid container direction={'column'} alignContent={'center'} item xs={12}>
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => {
                            return (
                                <FormControl
                                    error={!!errors.type?.message}
                                    fullWidth
                                    sx={{ mt: '10px', width: '25%' }}
                                >
                                    <InputLabel
                                        error={!!errors.type?.message}
                                        id="demo-simple-select-label"
                                        shrink
                                    >
                                        {t('Notification.AppType')}
                                    </InputLabel>
                                    <Select
                                        labelId="select-label"
                                        id="simple-select"
                                        {...field}
                                        label={t('Category.genderType')}
                                    >
                                        <MenuItem value={0}>{t('Category.male')}</MenuItem>
                                        <MenuItem value={1}>{t('Category.female')}</MenuItem>
                                    </Select>
                                </FormControl>
                            )
                        }}
                    />
                    <Typography color={'error'}>
                        {errors.type?.message}
                    </Typography>
                </Grid>
            </>
        )
    }

export default CategoryType