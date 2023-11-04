import { useRef } from "react";
import { TextField, Stack } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const CodeInput = ({ keyName, inputs, ...props }) => {
  const methods = useFormContext();
  const codeRef = useRef(null);

  const handleChangeWithNextField = (event, handleChange) => {
    const { maxLength, value, name } = event.target;

    const fieldIndex = Number(name.replace(keyName, ""));

    const nextField = document.querySelector(
      `input[name=${keyName}${fieldIndex + 1}]`
    );

    if (value.length > maxLength) {
      event.target.value = value[0];
    }
    if (
      value.toString().length >= maxLength &&
      nextField !== null &&
      fieldIndex < 6
    ) {
      nextField.focus();
    }

    handleChange(event);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      py={1}
      alignItems="center"
      ref={codeRef}
      justifyContent="center"
    >
      {inputs.map((name, index) => (
        <Controller
          {...methods}
          name={name}
          key={`${name}-${index + 1 * 99}`}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              {...props}
              color="info"
              name={`${keyName}${index + 1}`}
              sx={{
                textAlign: "center",
              }}
              InputProps={{
                sx: {
                  width: {
                    xs: 44,
                    sm: 54,
                  },
                  height: {
                    xs: 44,
                    sm: 54,
                  },
                },
              }}
              inputProps={{
                type: "number",
                maxLength: 1,
                autoFocus: index === 0,
                style: {
                  textAlign: "center",
                },
              }}
              onChange={(event) => {
                handleChangeWithNextField(event, field.onChange);
              }}
              onKeyUp={(event) => {
                if (event.key === "Backspace") {
                  const prevField = document.querySelector(
                    `input[name=${keyName}${index + 1 - 1}]`
                  );
                  if (prevField && event.target.value === "") {
                    prevField.focus();
                  }
                }
              }}
            />
          )}
        />
      ))}
    </Stack>
  );
};

export default CodeInput;
