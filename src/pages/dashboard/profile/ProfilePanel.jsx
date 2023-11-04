import {
  Stack,
  Typography,
  IconButton,
  useTheme,
  Alert,
  Button,
} from "@mui/material";
import { CaretLeft } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SimpleBarStyle } from "../../../components/Scrollbar";
import SidebarContainer from "../SidebarContainer";
import { TextField, FormProvider } from "../../../components/hook-form";

import { profileValidation } from "../../../validations";

const ProfilePanel = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const defaultValues = {
    name: "",
    about: "",
    avatarUrl: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(profileValidation),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    setError,
    watch,
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (err) {
      console.log(data);
      setError("afterSubmit", {
        ...err,
        message: err.message,
      });
    }
  };

  return (
    <>
      <SidebarContainer>
        <SimpleBarStyle style={{ width: "100%", height: "100%" }}>
          <Stack direction="column" spacing={4} p={3} pb={2} width="100%">
            <Stack direction="row" spacing={3} width="100%" alignItems="center">
              <IconButton sx={{ color: mode === "light" && "grey.700" }}>
                <CaretLeft size={27} weight="regular" />
              </IconButton>
              <Typography variant="h3">Profile</Typography>
            </Stack>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                {errors.afterSubmit && (
                  <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}
                <TextField
                  name="name"
                  label="Name"
                  helperText={"This name is visible to your contacts."}
                />
                <TextField
                  multiline
                  minRows={3}
                  name="about"
                  label="About"
                  helperText={"Must be less than 100 characters."}
                />
                <Stack direction="row" justifyContent="end" pt={1}>
                  <Button
                    color="info"
                    type="submit"
                    size="medium"
                    variant="outlined"
                    sx={{ px: 4, py: 1.2, boxShadow: "none" }}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </FormProvider>
          </Stack>
        </SimpleBarStyle>
      </SidebarContainer>
    </>
  );
};

export default ProfilePanel;
