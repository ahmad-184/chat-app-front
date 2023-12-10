import { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Avatar,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import { PaperPlaneRight } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { updateFriendRequestsThunk } from "../../../../../app/slices/app";
import { getToken, getUserId } from "../../../../../app/slices/auth";
import useSocket from "../../../../../hooks/useSocket";
import { successToast } from "../../../../../components/ToastProvider";

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
          <Avatar
            alt={`${item.firstname} ${item.lastname}`}
            src={item.avatar}
          />
        </Box>
        <Stack sx={{ minWidth: 0, maxWidth: "45%" }}>
          <Typography
            noWrap
            variant="body1"
          >{`${item.firstname} ${item.lastname}`}</Typography>
          <Typography noWrap variant="body2">
            {item.email}
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
