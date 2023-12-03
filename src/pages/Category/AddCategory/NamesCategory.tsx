import { Grid } from '@mui/material'
import React from 'react'
import FormTextField from '../../../Components/Form/FormTextField'
import useCategoryHook from '../hooks/useCategoryHook'
import { Control, FieldErrors } from 'react-hook-form'
import { AddCategoryType } from '../hooks/type'

const NamesCategory: React.FC<{
    control: Control<AddCategoryType, any>,
    errors: FieldErrors<AddCategoryType>
}> = ({
    control,
    errors
}) => {

        const { t } = useCategoryHook()

        return (
            <>
                <Grid container justifyContent={'end'} item xs={6}>
                    <FormTextField
                        name="name.0.value"
                        control={control}
                        label={t('form.arName')}
                        placeholder={t('form.arName')}
                        shrink
                        error={errors.name?.[0]?.value}
                    />
                </Grid>
                <Grid container item xs={6}>

                    <FormTextField
                        name="name.1.value"
                        control={control}
                        label={t('form.enName')}
                        placeholder={t('form.enName')}
                        error={errors.name?.[1]?.value}
                        shrink
                    />
                </Grid>
            </>
        )
    }

export default NamesCategory