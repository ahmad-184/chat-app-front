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

import TextField from "../../../components/hook-form/TextField";
import FormProvider from "../../../components/hook-form/FormProvider";
import FormButton from "../FormButton";

import { resetPasswordValidation } from "../../../validations";

import useLocales from "../../../hooks/useLocales";

const ResetPassword = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const { translate } = useLocales();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const defaultValues = {
    password: "",
    confirmPassword: "",
  };

  const methods = useForm({
    resolver: zodResolver(resetPasswordValidation(translate)),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    setError,
    reset,
    watch,
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
      <Stack spacing={2} width="100%">
        {errors.afterSubmit && (
          <Alert severity="error" variant="outlined">
            {errors.afterSubmit.message}
          </Alert>
        )}
        <TextField
          name="password"
          label={translate("Password")}
          helperText={
            watch("password").length < 6 &&
            translate("Password must be at least 6 character")
          }
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
        <TextField
          name="confirmPassword"
          label={translate("Confirm password")}
          helperText={null}
          sx={{
            "& .MuiInputBase-root": {
              pr: "0px",
            },
            pb: 0.5,
          }}
          type={showConfirmPass ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  sx={{
                    color: mode === "light" && "grey.700",
                  }}
                  onClick={() => setShowConfirmPass((prev) => !prev)}
                >
                  {showConfirmPass ? <EyeSlash size={24} /> : <Eye size={24} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormButton variant="contained" size="large">
          {translate("Send")}
        </FormButton>
      </Stack>
    </FormProvider>
  );
};

export default ResetPassword;
