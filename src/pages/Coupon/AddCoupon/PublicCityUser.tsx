import { Autocomplete, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import CouponHook from "../hook/CouponHook";
import { INameAndId, IPagination } from "../../../interface/generic";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { AddCouponType } from "../hook/type";
import { getCityAllType } from "../../../API/City/type";
import GenericCustomers from "../../../Components/Coupon/GenericCustomers";


const PublicCityUser: FC<{
    control: Control<AddCouponType, any>,
    CityUser: string,
    setCityUser: Dispatch<SetStateAction<string>>,
    register: UseFormRegister<AddCouponType>,
    setValue: UseFormSetValue<AddCouponType>,
    errors: FieldErrors<AddCouponType>,
    countries: INameAndId[] | undefined,
    cities: IPagination<getCityAllType> | undefined
}> = ({ CityUser, control, setCityUser, setValue, errors, countries, cities }) => {

    const { t, } = CouponHook()

    return (
        <>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={'Public'}
                    name="radio-buttons-group"
                    row
                    value={CityUser}
                    onChange={
                        (event: ChangeEvent<HTMLInputElement>) => setCityUser(event.target.value)
                    }
                >
                    <FormControlLabel value="Public" control={<Radio />} label={t("Coupon.Public")} />
                    <FormControlLabel value="ByUser" control={<Radio />} label={t("Coupon.ByUser")} />
                    <FormControlLabel value="ByCity" control={<Radio />} label={t("Coupon.ByCity")} />
                </RadioGroup>
            </FormControl>
            <Grid container >
                {CityUser === 'ByUser' &&
                    <Grid xs={12}>
                        {/* <Controller
                            name="customers"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Autocomplete
                                        multiple
                                        blurOnSelect={false}
                                        clearOnEscape={false}
                                        disableCloseOnSelect
                                        filterSelectedOptions
                                        id='UserSelect'
                                        {...field}
                                        fullWidth

                                        getOptionLabel={(option) => `${option.userName} - ${option.phoneNumber}`}
                                        filterOptions={(options, { inputValue }) => {
                                            return options.filter((option) =>
                                                option.phoneNumber.toString().includes(inputValue) || option.userName.includes(inputValue)
                                            );
                                        }}
                                        onChange={(_, newValue) => {
                                            setValue('customers', (newValue));
                                        }}
                                        renderOption={(prop, customer) => (
                                            <li {...prop} key={customer.userId}>
                                                <Grid container justifyContent={'space-between'}>
                                                    <Typography>
                                                        {customer.userName ?? 'No Name'}
                                                    </Typography>
                                                    <Typography>
                                                        {customer.phoneNumber ?? 'No Number'}
                                                    </Typography>
                                                </Grid>
                                            </li>
                                        )}

                                        options={Customers?.filter((customer) => customer.userName !== null) ?? []}

                                        renderInput={((params) => (
                                            <TextField
                                                {...params}
                                                label={t('Notification.users')}
                                                placeholder='users'
                                                fullWidth
                                                helperText={errors.customers?.message}
                                                error={!!errors.customers?.message}
                                            />
                                        ))}
                                    />
                                )
                            }}
                        /> */}
                        <GenericCustomers
                            name="customers"
                            control={control}
                            setValue={setValue}
                            errors={errors}
                        />

                    </Grid>
                }

                {CityUser === 'ByCity' &&
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Controller
                                name="country"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Autocomplete
                                            id='CountrySelect'
                                            {...field}
                                            fullWidth
                                            onChange={(_, newValue) => {
                                                setValue('country', newValue)
                                                setValue('city', null)
                                            }}
                                            renderOption={(prop, country) => (
                                                <li {...prop} key={country.id}>
                                                    {country.name ?? 'No Name'}
                                                </li>
                                            )}
                                            getOptionLabel={(option: INameAndId) => option.name ?? 'No Name'}
                                            options={countries ?? []}
                                            renderInput={((params) => (
                                                <TextField
                                                    {...params}
                                                    label={t("Coupon.Countries")}
                                                    placeholder={t("Coupon.Countries")}
                                                    fullWidth
                                                    required={CityUser === 'ByCity'}
                                                />
                                            ))}
                                        />
                                    )
                                }}
                            />


                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name='city'
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Autocomplete
                                            id='CitySelect'


                                            {...field}
                                            fullWidth
                                            onChange={(_, newValue) => setValue('city', newValue)}
                                            renderOption={(prop, customer) => (
                                                <li {...prop} key={customer.id}>
                                                    {customer.name ?? 'No Name'}
                                                </li>
                                            )}
                                            getOptionLabel={(option: INameAndId) => option.name ?? 'No Name'}
                                            options={cities?.data ?? []}
                                            renderInput={((params) => (
                                                <TextField
                                                    {...params}
                                                    label={t("Coupon.Cities")}
                                                    placeholder={t("Coupon.Cities")}
                                                    fullWidth
                                                    required={CityUser === 'ByCity'}

                                                />
                                            ))}
                                        />
                                    )
                                }}

                            />
                        </Grid>
                    </Grid>
                }
            </Grid>
        </>
    )
}

export default PublicCityUser