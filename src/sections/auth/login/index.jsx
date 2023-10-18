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
import { useDispatch } from "react-redux";

import TextField from "../../../components/hook-form/TextField";
import FormProvider from "../../../components/hook-form/FormProvider";
import FormButton from "../FormButton";

import { loginValidation } from "../../../validations";

import useLocales from "../../../hooks/useLocales";

import { loginUserThunk } from "../../../app/slices/auth";
import ThrowError from "../../../helpers/ThrowError";

const Login = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const dispatch = useDispatch();

  const { translate } = useLocales();

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: zodResolver(loginValidation(translate)),
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
      await dispatch(
        loginUserThunk({ email: data.email, password: data.password })
      ).then((res) => {
        if (res.payload) {
          return ThrowError(res);
        } else {
          reset();
        }
      });
    } catch (err) {
      setError("afterSubmit", {
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
        <TextField
          type="text"
          name="email"
          label={translate("Email address")}
          helperText={null}
        />
        <TextField
          name="password"
          label={translate("Password")}
          helperText={null}
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
        <Stack direction="row" justifyContent="end">
          <Link
            component={RRDLink}
            sx={{
              color: mode === "light" ? "grey.700" : "grey.300",
              textDecorationColor:
                mode === "light"
                  ? theme.palette.grey[600]
                  : theme.palette.grey[300],
            }}
            variant="body2"
            underline="always"
            to="/auth/forgot-password"
          >
            {translate("Forgot your password?")}
          </Link>
        </Stack>
        <FormButton variant="contained" loading={isSubmitting} size="large">
          {translate("Login")}
        </FormButton>
      </Stack>
    </FormProvider>
  );
};

export default Login;
