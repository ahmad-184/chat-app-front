import { useCallback, useState } from "react";
import { Stack, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";

import {
  TextField,
  FormProvider,
  UploadAvatar as RHFUploadAvatar,
} from "../../../components/hook-form";
import LoaderButton from "../../../components/LoaderButton";
import { profileValidation } from "../../../validations";
import { updateUserThunk } from "../../../app/slices/auth";
import uploader from "../../../utils/uploader";
import ProgressButton from "../../../components/ProgressButton";

const ProfileSetting = () => {
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const defaultValues = {
    name: user.name,
    about: user.about,
    avatar: user.avatar,
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(profileValidation),
  });

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = methods;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (typeof file === "object" && Object.entries(file).length) {
        await uploader([{ file, type: "image" }], setUploadProgress).then(
          (response) => {
            const imgUrl = response[0].file.url;
            setValue("avatar", imgUrl);
            data.avatar = imgUrl;
          }
        );
      }

      await dispatch(
        updateUserThunk({
          token,
          data: {
            name: data.name,
            about: data.about,
            avatar: data.avatar,
          },
        })
      );
    } catch (err) {
      console.log(data);
      setError("afterSubmit", {
        ...err,
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const showDropError = (message) => {
    setError("avatar", { message });
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      setFile(file);

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue("avatar", newFile.preview, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <RHFUploadAvatar
            name="avatar"
            maxSize={3145728}
            onDrop={handleDrop}
            showDropError={showDropError}
          />
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
            <ProgressButton
              type="submit"
              size="medium"
              variant="contained"
              fullWidth
              loading={loading}
              value={uploadProgress}
              sx={{
                px: 4,
                py: 1.2,
                boxShadow: "none",
                bgcolor: (theme) =>
                  theme.palette.mode === "light" ? "grey.800" : "grey.900",
                "&:hover": {
                  bgcolor: "grey.700",
                },
              }}
            >
              Save
            </ProgressButton>
          </Stack>
        </Stack>
      </FormProvider>
    </>
  );
};

export default ProfileSetting;
