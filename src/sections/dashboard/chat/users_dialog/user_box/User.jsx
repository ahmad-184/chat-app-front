import { useState } from "react";
import { Stack, Box, Typography, Button, useTheme, alpha } from "@mui/material";
import { PaperPlaneRight } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { updateFriendRequestsThunk } from "../../../../../app/slices/app";
import { getToken, getUserId } from "../../../../../app/slices/auth";
import useSocket from "../../../../../hooks/useSocket";
import getPhotoUrl from "../../../../../utils/getPhotoUrl";
import createAvatar from "../../../../../utils/createAvatar";
import { successToast } from "../../../../../components/ToastProvider";
import { Avatar } from "../../../../../components/image";

const User = ({ item }) => {
  const token = useSelector(getToken);
  const userId = useSelector(getUserId);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const { socket } = useSocket();

  const handleSendFriendRequest = () => {
    setIsLoading(true);
    socket.emit(
      "friend_request",
      { to: item._id, from: userId },
      async (message) => {
        await dispatch(updateFriendRequestsThunk({ token }))
          .then(() => successToast({ message }))
          .finally(() => setIsLoading(false));
      }
    );
  };

  const imgData = getPhotoUrl(item?.avatar, "300", "10", "", "10");
  const avatar = createAvatar(item?.name);

  return (
    <Box
      sx={{
        p: 1,
        borderRadius: 1,
        cursor: "pointer",
        backgroundColor:
          theme.palette.mode === "light"
            ? "grey.200"
            : alpha(theme.palette.grey[900], 0.4),
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Box p={0.5}>
          <Avatar src={imgData.url} placeholder={imgData.placeholder}>
            {avatar.name}
          </Avatar>
        </Box>
        <Stack sx={{ minWidth: 0, maxWidth: "45%" }}>
          <Typography
            noWrap
            textTransform="capitalize"
            fontWeight={600}
            variant="body1"
          >
            {item?.name}
          </Typography>
          <Typography noWrap variant="body2">
            {item?.email}
          </Typography>
        </Stack>
        <Box display="flex" flexGrow={1} justifyContent="end">
          <Button
            variant="text"
            color="info"
            onClick={() => {
              handleSendFriendRequest();
            }}
            endIcon={<PaperPlaneRight size={20} />}
            disabled={isLoading}
          >
            Send Request
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default User;
