import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Alert } from "@mui/material";
import { useDispatch } from "react-redux";

import TextField from "../../../components/hook-form/TextField";
import FormProvider from "../../../components/hook-form/FormProvider";
import FormButton from "../FormButton";

import useLocales from "../../../hooks/useLocales";
import { forgotPasswordValidation } from "../../../validations";
import { forgotPasswordThunk } from "../../../app/slices/auth";
import ThrowError from "../../../helpers/ThrowError";

const ForgotPassword = () => {
  const dispatch = useDispatch();

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
    formState: { isSubmitting, errors },
    setError,
    reset,
  } = methods;

  const onSubmit = async (data) => {
    try {
      await dispatch(forgotPasswordThunk({ email: data.email })).then((res) => {
        if (res.payload) {
          return ThrowError(res);
        } else {
          reset();
        }
      });
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
        <TextField
          type="text"
          name="email"
          label={translate("Email address")}
          helperText={null}
        />
        <FormButton variant="contained" size="large" loading={isSubmitting}>
          {translate("Send")}
        </FormButton>
      </Stack>
    </FormProvider>
  );
};

export default ForgotPassword;
