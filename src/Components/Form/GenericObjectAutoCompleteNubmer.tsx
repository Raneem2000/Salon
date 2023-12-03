/* eslint-disable react/jsx-props-no-spreading */
import { Autocomplete, TextField } from "@mui/material";
import { INameAndIdNumber } from "../../interface/generic"
import { Dispatch, FC, SetStateAction} from "react";
export type Props = {
    errorMessage?: string | undefined;
    disabled?: boolean;
    // onChange: (value: ICity[] | INameAndId | null) => void;
    required?: boolean;
    label?: string;
    option: INameAndIdNumber[] | undefined;
    idData?: string;
    fullWidth?: boolean;
    dataTest?: string
    [key: string]: any;
    multiple?: false;
    value: INameAndIdNumber;
    onChange: (value: INameAndIdNumber | null) => void;
    setId?: Dispatch<SetStateAction<number | undefined>>;
    req?:boolean
  } 
const GenericObjectAutoCompleteNubmer: FC<Props> = ({
  req,
    value,
    onChange,
    errorMessage,
    label,
    disabled = false,
    multiple = false,
    option,
    idData,
    fullWidth,
    sx,
    dataTest,
    setId,
    ...props
}) => {
    // console.log(value)
    // const [id,setId] = useState()
    // console.log(id)
    // console.log(value)
  return (
    <>
    <Autocomplete
       isOptionEqualToValue={(option, value) => value.id === option.id}
       value={value ?? null}
       fullWidth={fullWidth}
       onChange={(_, newValue) => {
         onChange(newValue as INameAndIdNumber[] & INameAndIdNumber);
        
       }}
       sx={{...sx}}
       options={option ?? []}
       // disabled={!option?.length || disabled}
       getOptionLabel={(option) => option.name}
       multiple={multiple}
       renderOption={(prop, category) => (
         <li {...prop} key={category.id}>
           {category.name}
         </li>
       )}
       {...props}
       renderInput={(params) => (
         <TextField
           {...params}
           label={label}
           fullWidth
           error={!!errorMessage}
           helperText={errorMessage}
           data-test={dataTest}
           color="primary"
           required={req}
         />
       )}
     />
     </>
  );
};

export default GenericObjectAutoCompleteNubmer;
