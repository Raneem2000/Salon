import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { ChangeEvent, FC } from "react"
import { UseFormSetValue } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { AddNotificationType } from "../hooks/type"


const ChooseType: FC<{
    setValue: UseFormSetValue<AddNotificationType>,
    publicUserCity: string
}> = ({
    setValue,
    publicUserCity
}) => {

        const { t } = useTranslation();

        return (
            <>
                <FormControl sx={{ mt: '10px' }}>

                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={publicUserCity}
                        onChange={
                            (event: ChangeEvent<HTMLInputElement>) =>
                                setValue('publicUserCity', event.target.value as "Public" | "User" | "City")
                        }
                    >
                        <FormControlLabel value="Public" control={<Radio />} label={t('Notification.public')} />
                        <FormControlLabel value="City" control={<Radio />} label={t('Notification.byCity')} />
                        <FormControlLabel value="User" control={<Radio />} label={t('Notification.byUsers')} />

                    </RadioGroup>
                </FormControl>
            </>
        )
    }

export default ChooseType