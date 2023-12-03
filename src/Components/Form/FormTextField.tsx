import { SxProps, TextField } from "@mui/material";
import { Control, Controller, FieldError } from "react-hook-form";
import React from "react";
export interface FormTextFieldProps {
  name: string;
  label?: string;
  multiline?: boolean;
  control: Control<any, any>;
  disabled?: boolean;
  readOnly?: boolean;
  shrink?: boolean;
  rules?: any;
  type?: string;
  [key: string]: any;
  req?: boolean;
  dataTest?: string;
  step?: string;
  value?: string;
  className?: string;
  error?: FieldError;
  defaultValue?: string | Date;
  sx?:SxProps
}

const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  defaultValue,
  label,
  disabled,
  type,
  req,
  dataTest,
  step,
  value,
  className,
  control,
  sx,
  shrink,
  error,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          sx={{
            marginTop: "3px",
            "& label": {
              fontSize: "17px",
            },
            ...sx
          }}
          defaultValue={defaultValue}
          {...field}
          required={req}
          variant="outlined"
          disabled={disabled}
          color="primary"
          label={label}
          type={type}
          fullWidth
          placeholder={label}
          data-test={dataTest}
          InputLabelProps={shrink ? { shrink } : {}}
          error={!!error}
          helperText={error && error.message}
          {...props}
        />
      )}
    />
  );
};
export default FormTextField;
