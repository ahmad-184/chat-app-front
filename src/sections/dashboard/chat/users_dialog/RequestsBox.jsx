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
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Trash, Check } from "phosphor-react";

import {
  updateFriendRequestsThunk,
  getFriendRequests,
  getAppLoading,
} from "../../../../app/slices/app";
import { getToken } from "../../../../app/slices/auth";

import { socket } from "../../../../socket";

const FriendsBox = () => {
  const { received, sent } = useSelector(getFriendRequests);
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const loading = useSelector(getAppLoading);

  const theme = useTheme();
  const mode = theme.palette.mode;

  useEffect(() => {
    dispatch(updateFriendRequestsThunk({ token }));
  }, []);

  const handleAcceptFriendRequest = (id) => {
    socket.emit("accept_friend_request", { request_id: id });
  };
  const handleRejectFriendRequest = (id) => {
    socket.emit("reject_friend_request", { request_id: id });
  };
  const handleDeleteFriendRequest = (id) => {
    socket.emit("delete_friend_request", { request_id: id });
  };

  if (!received.length && !sent.length && loading) {
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
    <Stack px={1} py={1} spacing={2} width="100%">
      <Box>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.mode === "light" ? "grey.500" : "grey.400",
            pb: 1,
          }}
        >
          Friend requests
        </Typography>
        <Stack spacing={1.5}>
          {received.length ? (
            received.map(({ sender, _id }, index) => (
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
                      color="info"
                      sx={{ boxShadow: "none" }}
                      onClick={() => handleAcceptFriendRequest(_id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="text"
                      color="inherit"
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
      </Box>
      <Divider
        variant="fullWidth"
        sx={{
          borderStyle: "dashed",
        }}
      />
      <Box>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.mode === "light" ? "grey.500" : "grey.400",
            pb: 1,
          }}
        >
          Requests i sent
        </Typography>
        <Stack spacing={1.5}>
          {sent.length ? (
            sent.map(({ reciver, _id, status }, index) => (
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
                      alt={`${reciver.firstname} ${reciver.lastname}`}
                      src={reciver.avatar}
                    />
                  </Box>
                  <Stack sx={{ minWidth: 0, maxWidth: "50%" }}>
                    <Typography
                      noWrap
                      variant="body1"
                    >{`${reciver.firstname} ${reciver.lastname}`}</Typography>
                    <Typography noWrap variant="body2">
                      {reciver.email}
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
                    <Chip
                      label={
                        status === "Accepted" ? (
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                          >
                            <Typography variant="inherit">{status}</Typography>
                            <Check size={19} weight="bold" />
                          </Stack>
                        ) : (
                          status
                        )
                      }
                      size="medium"
                      sx={{
                        color: "grey.100",
                        fontWeight: "600",
                        ...(mode === "light" &&
                          status === "Accepted" && {
                            backgroundColor: "grey.700",
                          }),
                        ...(status === "Rejected" && {
                          backgroundColor: "error.dark",
                        }),
                      }}
                      color={
                        status === "Pending"
                          ? "primary"
                          : status === "Rejected"
                          ? "error"
                          : "default"
                      }
                    />
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteFriendRequest(_id)}
                    >
                      <Trash size={22} />
                    </IconButton>
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
      </Box>
    </Stack>
  );
};

export default FriendsBox;
