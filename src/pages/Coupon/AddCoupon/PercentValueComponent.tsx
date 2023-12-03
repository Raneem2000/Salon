import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material"
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react"
import CouponHook from "../hook/CouponHook"
import { AddCouponType } from "../hook/type"
import { FieldErrors, UseFormRegister } from "react-hook-form"


const PercentValueComponent: FC<{
    setPercentValue: Dispatch<SetStateAction<string>>,
    PercentValue: string,
    register: UseFormRegister<AddCouponType>,
    errors: FieldErrors<AddCouponType>
}> = ({ setPercentValue, PercentValue, errors, register }) => {

    const { t } = CouponHook();

    return (
        <>
            <Grid item xs={12} >
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={'value'}
                        name="radio-buttons-group"
                        row
                        value={PercentValue}
                        onChange={
                            (event: ChangeEvent<HTMLInputElement>) => setPercentValue(event.target.value)
                        }
                    >
                        <FormControlLabel value="value" control={<Radio />} label={t("Coupon.PerValue")} />
                        <FormControlLabel value="percent" control={<Radio />} label={t("Coupon.PerPercent")} />
                    </RadioGroup>
                </FormControl>
                <Grid container >
                    {
                        PercentValue === 'value' &&
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-basic"
                                {...register('value')}
                                error={!!errors.value?.message}
                                helperText={errors.value?.message}
                                type='number'
                                label={t("Coupon.PerValue")}
                                variant="outlined"
                            />
                        </Grid>
                    }
                    {
                        PercentValue === 'percent' &&
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-basic"
                                {...register('percentage')}
                                error={!!errors.percentage?.message}
                                helperText={errors.percentage?.message}
                                type='number'
                                label={t("Coupon.PerPercent")}
                                variant="outlined"
                            />
                        </Grid>

                    }

                </Grid>
            </Grid>
        </>
    )
}

export default PercentValueComponent