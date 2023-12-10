import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormProvider from "../../../components/hook-form/FormProvider";
import FormButton from "../FormButton";

import useLocales from "../../../hooks/useLocales";
import { verifyCodeValidation } from "../../../validations";
import CodeInput from "../../../components/hook-form/CodeInput";
import {
  verifyUserThunk,
  getRegisterEmail,
  updateRegisterEmail,
} from "../../../app/slices/auth";

const VerifyCode = () => {
  const registerEmail = useSelector(getRegisterEmail);

  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { translate } = useLocales();

  useEffect(() => {
    if (!registerEmail) {
      navigate("/auth/login");
    }
  }, [registerEmail]);

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  const methods = useForm({
    resolver: zodResolver(verifyCodeValidation),
    defaultValues,
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = methods;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const values = Object.values(data).join("");
      await dispatch(
        verifyUserThunk({
          email: registerEmail,
          otp: values,
        })
      ).then(async (res) => {
        if (res.error) {
          throw res;
        } else {
          reset();
          await dispatch(updateRegisterEmail({ email: "" }));
          navigate("/auth/login");
        }
      });
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
        <CodeInput
          keyName="code"
          inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
        />
        <FormButton variant="contained" size="large" loading={isLoading}>
          {translate("Send")}
        </FormButton>
      </Stack>
    </FormProvider>
  );
};

export default VerifyCode;
