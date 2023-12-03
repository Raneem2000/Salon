import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
import { FC } from 'react'
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { GetCustomersNamesCpType } from '../../API/CpManagement/type';
import { useTranslation } from 'react-i18next';
import { CpManagementQueries } from '../../API/CpManagement/CpManagementQueries';

const GenericCustomers: FC<{
    name: string,
    control: Control<any, any>,
    setValue: UseFormSetValue<any>,
    Customers?: GetCustomersNamesCpType[] | undefined,
    errors: FieldErrors<any>,

}> = ({ control, name, setValue, errors }) => {

    const { t } = useTranslation()
    const { data: CustomersTest } =
        CpManagementQueries.useCpCustomersNames();
    console.log({ CustomersTest });

    return (
        <>
            <Controller
                name={name}
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
                                console.log({ newValue });

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
                            options={CustomersTest ?? []}
                            renderInput={((params) => (
                                <TextField
                                    {...params}
                                    label={t('Notification.users')}
                                    placeholder='users'
                                    fullWidth
                                    // helperText={errors.customers?.message}
                                    error={!!errors.customers?.message}
                                />
                            ))}
                        />
                    )
                }}
            />
        </>
    )
}

export default GenericCustomers