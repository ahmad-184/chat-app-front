import { useEffect } from "react";
import {
  Stack,
  Box,
  Typography,
  Avatar,
  Button,
  useTheme,
  alpha,
  Skeleton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { PaperPlaneRight } from "phosphor-react";
import { enqueueSnackbar } from "notistack";

import {
  updateUsersThunk,
  getUsers,
  getAppLoading,
  updateFriendRequests,
  updateFriendRequestsThunk,
} from "../../../../app/slices/app";
import { getToken, getUserId } from "../../../../app/slices/auth";
import { socket } from "../../../../socket";

const UserBox = () => {
  const users = useSelector(getUsers);
  const token = useSelector(getToken);
  const userId = useSelector(getUserId);
  const dispatch = useDispatch();
  const loading = useSelector(getAppLoading);

  const theme = useTheme();

  useEffect(() => {
    dispatch(updateUsersThunk({ token }));
  }, []);

  const handleSendFriendRequest = (user_id) => {
    socket.emit(
      "friend_request",
      { to: user_id, from: userId },
      async (message) => {
        await dispatch(updateFriendRequestsThunk({ token })).then(() =>
          enqueueSnackbar(message, { variant: "success" })
        );
      }
    );
  };

  if (!users.length && loading) {
    return (
      <Stack px={1} py={1} spacing={1.5} width="100%">
        {[...Array(3)].map((_, index) => (
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              cursor: "pointer",
              backgroundColor: "transparent",
              border: "1px solid",
              borderColor:
                theme.palette.mode === "light" ? "grey.200" : "grey.700",
            }}
            key={index}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box p={0.5}>
                <Skeleton
                  variant="circular"
                  animation="wave"
                  width={45}
                  height={45}
                />
              </Box>
              <Stack sx={{ maxWidth: "50%" }}>
                <Skeleton animation="wave" width={"90px"} height={"30px"} />
                <Skeleton animation="wave" width={"140px"} height={"30px"} />
              </Stack>
              <Stack
                display="flex"
                flexGrow={1}
                justifyContent="end"
                spacing={1}
                direction="row"
                alignItems="center"
              >
                <Skeleton animation="wave" width={"100px"} height={"50px"} />
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    );
  }

  return (
    <Stack px={1} py={1} spacing={1.5} width="100%">
      {users.length ? (
        users.map((item, index) => (
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              // boxShadow: theme.shadows[1],
              cursor: "pointer",
              backgroundColor:
                theme.palette.mode === "light"
                  ? "grey.200"
                  : alpha(theme.palette.grey[900], 0.4),
            }}
            key={index}
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
                  onClick={() => handleSendFriendRequest(item._id)}
                  endIcon={<PaperPlaneRight size={20} />}
                >
                  Send Request
                </Button>
              </Box>
            </Stack>
          </Box>
        ))
      ) : (
        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            color: "grey.500",
          }}
        >
          ...Therer is no user, so sad...
        </Typography>
      )}
    </Stack>
  );
};

export default UserBox;
