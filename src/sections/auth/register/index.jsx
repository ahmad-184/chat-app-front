import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Stack,
  useTheme,
  Link,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Eye, EyeSlash } from "phosphor-react";
import { Link as RRDLink } from "react-router-dom";

import TextField from "../../../components/hook-form/TextField";
import FormProvider from "../../../components/hook-form/FormProvider";
import FormButton from "../FormButton";

import { registerValidation } from "../../../validations";

const Register = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: zodResolver(registerValidation),
    defaultValues,
  });

  const [showPass, setShowPass] = useState(false);

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    setError,
    reset,
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
      reset();
    } catch (err) {
      console.log(data);
      setError("afterSubmit", {
        ...err,
        message: err.message,
      });
    }
  };

  return (
    <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
      <Stack spacing={2.5} width="100%">
        {errors.afterSubmit && (
          <Alert severity="error" variant="outlined">
            {errors.afterSubmit.message}
          </Alert>
        )}
        <Stack
          spacing={2}
          direction={{
            xs: "column",
            sm: "row",
          }}
          justifyContent="space-between"
        >
          <TextField
            type="text"
            name="firstname"
            label="Firstname"
            helperText={null}
          />
          <TextField
            type="text"
            name="lastname"
            label="Lastname"
            helperText={null}
          />
        </Stack>
        <TextField
          type="text"
          name="email"
          label="Email address"
          helperText={null}
        />
        <TextField
          name="password"
          label="Password"
          helperText={"password must be at least 6 character."}
          sx={{
            "& .MuiInputBase-root": {
              pr: "0px",
            },
          }}
          type={showPass ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  sx={{
                    color: mode === "light" && "grey.700",
                  }}
                  onClick={() => setShowPass((prev) => !prev)}
                >
                  {showPass ? <EyeSlash size={24} /> : <Eye size={24} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormButton variant="contained" size="large">
          Login
        </FormButton>
      </Stack>
    </FormProvider>
  );
};

export default Register;
