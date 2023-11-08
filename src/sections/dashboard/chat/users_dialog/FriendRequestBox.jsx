import { useEffect } from "react";
import {
  Stack,
  Box,
  Typography,
  Avatar,
  useTheme,
  Button,
  alpha,
  Skeleton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  updateFriendRequestsThunk,
  getFriendRequests,
  getAppLoading,
} from "../../../../app/slices/app";
import { getToken } from "../../../../app/slices/auth";

import { socket } from "../../../../socket";

const FriendsBox = () => {
  const friendRequests = useSelector(getFriendRequests);
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const loading = useSelector(getAppLoading);

  const theme = useTheme();

  useEffect(() => {
    dispatch(updateFriendRequestsThunk({ token }));
  }, []);

  const handleAcceptFriendRequest = (id) => {
    socket.emit("accept_friend_request", { request_id: id });
  };
  const handleRejectFriendRequest = (id) => {
    socket.emit("reject_friend_request", { request_id: id });
  };

  return "...";

  if (!friendRequests.length && loading) {
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
                <Skeleton animation="wave" width={"80px"} height={"30px"} />
                <Skeleton animation="wave" width={"130px"} height={"30px"} />
              </Stack>
              <Stack
                display="flex"
                flexGrow={1}
                justifyContent="end"
                spacing={1}
                direction="row"
                alignItems="center"
              >
                <Skeleton animation="wave" width={"70px"} height={"50px"} />
                <Skeleton animation="wave" width={"70px"} height={"50px"} />
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    );
  }

  return (
    <Stack px={1} py={1} spacing={1.5} width="100%">
      {friendRequests.length ? (
        friendRequests.map(({ sender, _id }, index) => (
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
            key={index}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box p={0.5}>
                <Avatar
                  alt={`${sender.firstname} ${sender.lastname}`}
                  src={sender.avatar}
                />
              </Box>
              <Stack sx={{ minWidth: 0, maxWidth: "50%" }}>
                <Typography
                  noWrap
                  variant="body1"
                >{`${sender.firstname} ${sender.lastname}`}</Typography>
                <Typography noWrap variant="body2">
                  {sender.email}
                </Typography>
              </Stack>
              <Stack
                display="flex"
                flexGrow={1}
                justifyContent="end"
                spacing={1}
                direction="row"
                alignItems="center"
              >
                <Button
                  variant="text"
                  color="success"
                  onClick={() => handleAcceptFriendRequest(_id)}
                >
                  Accept
                </Button>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => handleRejectFriendRequest(_id)}
                >
                  Reject
                </Button>
              </Stack>
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
          ...Therer is no friend request...
        </Typography>
      )}
    </Stack>
  );
};

export default FriendsBox;
