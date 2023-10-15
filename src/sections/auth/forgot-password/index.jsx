import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Alert } from "@mui/material";

import TextField from "../../../components/hook-form/TextField";
import FormProvider from "../../../components/hook-form/FormProvider";
import FormButton from "../FormButton";

import { forgotPasswordValidation } from "../../../validations";

import useLocales from "../../../hooks/useLocales";

const ForgotPassword = () => {
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
        <TextField
          type="text"
          name="email"
          label={translate("Email address")}
          helperText={null}
        />
        <FormButton variant="contained" size="large">
          {translate("Send")}
        </FormButton>
      </Stack>
    </FormProvider>
  );
};

export default ForgotPassword;
