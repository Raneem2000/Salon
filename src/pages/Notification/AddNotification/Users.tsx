import { Grid } from "@mui/material";
import { FC } from "react";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { AddNotificationType } from "../hooks/type";
import { GetCustomersNamesCpType } from "../../../API/CpManagement/type";
import GenericCustomers from "../../../Components/Coupon/GenericCustomers";

const Users: FC<{
    register: UseFormRegister<AddNotificationType>,
    errors: FieldErrors<AddNotificationType>,
    setValue: UseFormSetValue<AddNotificationType>,
    watch: UseFormWatch<AddNotificationType>,
    customerLoading: boolean,
    Customers: GetCustomersNamesCpType[] | undefined,
    control: Control<AddNotificationType, any>

}> = ({
    errors,
    setValue, control
}) => {

        return (
            <>
                <Grid container xs={12}>

                    <GenericCustomers
                        name="customers"
                        control={control}
                        setValue={setValue}
                        errors={errors}
                    />
                </Grid>
            </>
        )
    }

export default Users