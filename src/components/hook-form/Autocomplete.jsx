import propTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import {
  Checkbox,
  Autocomplete as MUIAutocomplete,
  TextField,
} from "@mui/material";

import ErrorMessage from "./ErrorMessage";

const Autocomplete = ({ name, helperText, options, label, ...other }) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <MUIAutocomplete
          {...field}
          id={`autocomplete-tags-${name}`}
          options={options}
          {...other}
          onChange={(_, newValue) =>
            setValue(name, newValue, { shouldValidate: true })
          }
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox style={{ marginRight: 8 }} checked={selected} />
              {option}
            </li>
          )}
          style={{ width: "100%" }}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                label={label}
                sx={{ width: "100%" }}
                color="info"
                error={!!error}
                helperText={
                  error ? <ErrorMessage message={error.message} /> : helperText
                }
              />
            );
          }}
        />
      )}
    />
  );
};

TextField.propTypes = {
  name: propTypes.string,
  helperText: propTypes.node,
};

export default Autocomplete;
