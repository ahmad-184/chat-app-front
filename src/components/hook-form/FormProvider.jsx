import React from "react";
import { FormProvider as RHFFormProvider } from "react-hook-form";

const FormProvider = ({ methods, onSubmit, children }) => {
  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </RHFFormProvider>
  );
};

export default FormProvider;
