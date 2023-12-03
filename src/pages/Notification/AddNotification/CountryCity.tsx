import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import Loading from "../../../Components/Loading";
import { INameAndId, IPagination } from "../../../interface/generic";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { FC } from "react";
import { AddNotificationType } from "../hooks/type";
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { getCityAllType } from "../../../API/City/type";



const CountryCity: FC<{
    register: UseFormRegister<AddNotificationType>,
    errors: FieldErrors<AddNotificationType>,
    setValue: UseFormSetValue<AddNotificationType>,
    watch: UseFormWatch<AddNotificationType>,
    isCountryLoading: boolean,
    countries: INameAndId[] | undefined,
    isCitiesLoading: boolean,
    cities: IPagination<getCityAllType> | undefined,
    control: Control<AddNotificationType, any>
}> = ({
    errors,
    setValue,
    watch,
    isCountryLoading,
    countries,
    isCitiesLoading,
    cities,
    control
}) => {

        const { t } = useTranslation()

        return (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='country'
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Autocomplete
                                        id='CountrySelect'
                                        {...field}
                                        fullWidth
                                        popupIcon={isCountryLoading ? <Loading size={25} /> : <ArrowDropDownIcon />}
                                        onChange={(_, newValue) => setValue('country', newValue)}
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
                                                label={t('Notification.country')}
                                                placeholder={t('Notification.country')}
                                                fullWidth
                                            />
                                        ))}
                                    />
                                )
                            }}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='city'
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Autocomplete
                                        id='CitySelect'
                                        {...field}
                                        fullWidth
                                        popupIcon={isCitiesLoading ? <Loading size={25} /> : <ArrowDropDownIcon />}
                                        onChange={(_, newValue) => setValue('city', newValue)}
                                        renderOption={(prop, customer) => (
                                            <li {...prop} key={customer.id}>
                                                {customer.name ?? 'No Name'}
                                            </li>
                                        )}
                                        disabled={!watch('country')}
                                        getOptionLabel={(option: INameAndId) => option.name ?? 'No Name'}
                                        options={cities?.data ?? []}
                                        renderInput={((params) => (
                                            <TextField
                                                {...params}
                                                label={t('Notification.cities')}
                                                placeholder={t('Notification.cities')}
                                                fullWidth
                                            />
                                        ))}
                                    />
                                )
                            }}
                        />

                    </Grid>
                </Grid>

                <Typography color={'error'} variant="subtitle2" sx={{ mt: '10px' }}>{errors.city?.name?.message}</Typography>
            </>
        )
    }

export default CountryCity