import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Stack,
  useTheme,
  InputAdornment,
  IconButton,
  Alert,
  Typography,
} from "@mui/material";
import { Eye, EyeSlash } from "phosphor-react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import TextField from "../../../components/hook-form/TextField";
import FormProvider from "../../../components/hook-form/FormProvider";
import FormButton from "../FormButton";

import { resetPasswordValidation } from "../../../validations";
import { resetPasswordThunk } from "../../../app/slices/auth";

import useLocales from "../../../hooks/useLocales";

const ResetPassword = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const codeToken = searchParams.get("code");

  useEffect(() => {
    if (!codeToken) {
      navigate("/auth/login");
    }
  }, [codeToken]);

  const [isLoading, setLoading] = useState(false);
  const [seccessMsg, setSuccessMsg] = useState("");
  const dispatch = useDispatch();

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
    formState: { errors },
    setError,
    reset,
    watch,
  } = methods;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await dispatch(
        resetPasswordThunk({
          password: data.password,
          confirmPassword: data.confirmPassword,
          token: codeToken,
        })
      ).then((res) => {
        if (res.error) {
          throw res;
        } else {
          reset();
          setSuccessMsg(res.payload.data.message);
        }
      });
      reset();
    } catch (err) {
      setError("afterSubmit", {
        message: err.payload.message || err.payload,
      });
    } finally {
      setLoading(false);
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
        {seccessMsg && (
          <Typography
            variant="body2"
            sx={(theme) => ({
              color:
                theme.palette.mode === "light"
                  ? "success.dark"
                  : "success.main",
            })}
          >
            {seccessMsg}
          </Typography>
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
        <FormButton variant="contained" size="large" loading={isLoading}>
          {translate("Send")}
        </FormButton>
      </Stack>
    </FormProvider>
  );
};

export default ResetPassword;
