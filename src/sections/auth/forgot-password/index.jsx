import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Alert, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import * as _ from "lodash";

import TextField from "../../../components/hook-form/TextField";
import FormProvider from "../../../components/hook-form/FormProvider";
import FormButton from "../FormButton";

import useLocales from "../../../hooks/useLocales";
import { forgotPasswordValidation } from "../../../validations";
import { forgotPasswordThunk } from "../../../app/slices/auth";
import ThrowError from "../../../helpers/ThrowError";

import Timer from "./Timer";

// 1 minute
const time = 1 * 60 * 1000;

const ForgotPassword = () => {
  const [timerOn, setTimerOn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [seccessMsg, setSuccessMsg] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (timerOn) {
      timer = setTimeout(() => {
        setTimerOn(false);
      }, time);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [timerOn]);

  const defaultValues = {
    email: "",
  };

  const { translate } = useLocales();

  const methods = useForm({
    resolver: zodResolver(forgotPasswordValidation(translate)),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = methods;

  const sendRequest = async (data) => {
    try {
      setLoading(true);
      await dispatch(forgotPasswordThunk({ email: data.email })).then((res) => {
        if (res.error) {
          throw res;
        } else {
          setTimerOn(true);
          reset();
          setSuccessMsg(res.payload.data.message);
        }
      });
      reset();
    } catch (err) {
      console.log(err);
      setError("afterSubmit", {
        message: err.payload.message || err.payload,
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = sendRequest;

  return (
    <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
      <Stack spacing={2.5} width="100%">
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
          type="text"
          name="email"
          label={translate("Email address")}
          helperText={null}
        />
        <FormButton
          variant="contained"
          size="large"
          loading={isLoading}
          disabled={timerOn}
        >
          {!timerOn ? (
            translate("Send")
          ) : (
            <Timer deadline={new Date(Date.now() + time)} />
          )}
        </FormButton>
      </Stack>
    </FormProvider>
  );
};

export default ForgotPassword;
