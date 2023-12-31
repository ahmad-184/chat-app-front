import { Toaster, toast } from "sonner";
import useSettings from "../hooks/useSettings";

import { FONT_PRIMARY } from "../theme/typography";
import { Stack, Typography } from "@mui/material";

export default function ToasterProvider() {
  const { themeDirection, themeMode } = useSettings();

  return (
    <Toaster
      theme={themeMode}
      dir={themeDirection}
      style={{
        fontFamily: FONT_PRIMARY,
      }}
      richColors={true}
      position="top-center"
      closeButton
    />
  );
}

export const successToast = ({ message, ...options }) => {
  return toast.success(message, { ...options });
};

export const errorToast = ({ message, ...options }) => {
  return toast.error(message, { ...options });
};

export const infoToast = ({ message, ...options }) => {
  return toast.info(message, { ...options });
};

export const warningToast = ({ message, ...options }) => {
  return toast.warning(message, { ...options });
};

export const newFriendRequestToast = ({ user_name, ...options }) => {
  return toast.info(`New friend request from ${user_name}`, {
    ...options,
  });
};

export const newMessageToast = ({ message, ...options }) => {
  return toast();
};
