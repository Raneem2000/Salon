/* eslint-disable react/jsx-props-no-spreading */
import { Autocomplete, SxProps, TextField } from "@mui/material";
import { INameAndId } from "../../interface/generic";
import { FC } from "react";
export type Props = {
  errorMessage?: string | undefined;
  disabled?: boolean;
  // onChange: (value: ICity[] | INameAndId | null) => void;
  required?: boolean;
  label?: string;
  option: INameAndId[] | undefined;
  idData?: string;
  fullWidth?: boolean;
  sx?: SxProps;
  dataTest?: string;
  [key: string]: any;
  multiple?: true;
  value: INameAndId[] | null;
  onChange: (value: INameAndId[] | null) => void;
  loading?:boolean
};

type ICity = {
  name: string;
  id: string;
  latitude: number;
  longitude: number;
};
const GenericAutoCompleteMultipule: FC<Props> = ({
  value,
  onChange,
  errorMessage,
  label,
  disabled = false,
  multiple = true,
  option,
  idData,
  fullWidth,
  sx,
  dataTest,
  loading,
  ...props
}) => {
  return (
    <Autocomplete
    loading={loading}
      isOptionEqualToValue={(option, value) => value.id === option.id}
      defaultValue={option}
      value={value ?? []}
      fullWidth={fullWidth}
      onChange={(_, newValue) => {
        onChange(newValue as ICity[] & ICity);
      }}
      disabled={disabled}
      sx={sx}
      options={option ?? []}
      getOptionLabel={(option) => option.name || ""}
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
        />
      )}
    />
  );
};

export default GenericAutoCompleteMultipule
