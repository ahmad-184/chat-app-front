import propTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import { TextField as MUITextField, Stack, Typography } from "@mui/material";

import ErrorMessage from "./ErrorMessage";

const TextField = ({ name, helperText, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <MUITextField
          {...field}
          error={!!error}
          fullWidth
          helperText={
            error ? <ErrorMessage message={error.message} /> : helperText
          }
          {...other}
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value
          }
          color="info"
        />
      )}
    />
  );
};

TextField.propTypes = {
  name: propTypes.string,
  helperText: propTypes.node,
};

export default TextField;
