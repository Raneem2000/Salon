import { Grid } from '@mui/material'
import FormTextField from '../../../Components/Form/FormTextField'
import CouponHook from '../hook/CouponHook'
import { FC } from 'react'
import { AddCouponType } from '../hook/type'
import { Control } from 'react-hook-form'

const SetDate: FC<{ control: Control<AddCouponType, any> }> = ({
    control
}) => {
    const { t } = CouponHook()

    return (
        <>
            <Grid container spacing={3} item xs={12} >
                <Grid item xs={12} sm={6}>
                    <FormTextField
                        label={t("form.fromDate")}
                        shrink
                        type="datetime-local"
                        name="fromDate"
                        control={control}
                        dataTest={"fromDate"}

                    />

                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormTextField
                        label={t("form.toDate")}
                        shrink
                        type="datetime-local"
                        name="toDate"
                        control={control}
                        dataTest={"toDate"}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default SetDate