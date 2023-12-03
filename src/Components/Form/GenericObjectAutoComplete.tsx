/* eslint-disable react/jsx-props-no-spreading */
import { Autocomplete, SxProps, TextField } from "@mui/material";
import { IAutoCompleteOption, INameAndId } from "../../interface/generic";
import { Dispatch, FC, SetStateAction, memo } from "react";
import { UseFormSetValue } from "react-hook-form";
export type Props = {
  errorMessage?: string | undefined;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  option: IAutoCompleteOption[] | undefined;
  idData?: string;
  fullWidth?: boolean;
  dataTest?: string;
  [key: string]: any;
  multiple?: boolean;
  value?: IAutoCompleteOption | undefined;
  onChange: (value: INameAndId | null) => void;
  setId?: Dispatch<SetStateAction<string | undefined>>;
  setValue?: UseFormSetValue<any>;
  name?: string;
  loading?: boolean;
  sx?:SxProps
};
const GenericObjectAutoComplete: FC<Props> = ({
  value,
  name,
  onChange,
  setValue,
  errorMessage,
  label,
  disabled = false,
  multiple = false,
  option,
  idData,
  fullWidth,
  sx,
  dataTest,
  loading,
  setId,
  ...props
}) => {
  return (
    <Autocomplete
      loading={loading}
      isOptionEqualToValue={(option, value) => value.id === option.id}
      value={value ?? null}
      fullWidth={fullWidth}
      onChange={(_, newValue) => {
        onChange(newValue as INameAndId);
        setValue && setValue(name!, newValue);
      }}
      sx={{ ...sx }}
      options={option ?? []}
      disabled={disabled}
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
          color="primary"
          required={props.required ?? false}
        />
      )}
    />
  );
};

export default memo(GenericObjectAutoComplete);
