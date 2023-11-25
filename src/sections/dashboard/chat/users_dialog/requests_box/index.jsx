import { useEffect } from "react";
import { Stack, Box, Typography, useTheme, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Trash, Check } from "phosphor-react";

import {
  updateFriendRequestsThunk,
  getFriendRequests,
  removeReceivedRequest,
  addFriend,
  removeUser,
  removeSentRequest,
} from "../../../../../app/slices/app";
import { getToken } from "../../../../../app/slices/auth";

import { ReceivedFriendRequest, RequestsStatus } from "./Requests";
import { enqueueSnackbar } from "notistack";

import {
  MotionContainer,
  MotionViewport,
} from "../../../../../components/animate";
import useSocket from "../../../../../hooks/useSocket";

const FriendsBox = () => {
  const { received, sent } = useSelector(getFriendRequests);
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  const { socket } = useSocket();

  const theme = useTheme();
  const mode = theme.palette.mode;

  useEffect(() => {
    dispatch(updateFriendRequestsThunk({ token }));
  }, []);

  const handleAcceptFriendRequest = (id, setIsLoading) => {
    socket.emit(
      "accept_friend_request",
      { request_id: id },
      async ({ message, friend }) => {
        await dispatch(updateFriendRequestsThunk({ token })).then(() => {
          dispatch(addFriend(friend));
          dispatch(removeUser(friend._id));
          enqueueSnackbar(message, { variant: "success" });
          setIsLoading(false);
        });
      }
    );
  };

  const handleRejectFriendRequest = (id, setIsLoading) => {
    socket.emit(
      "reject_friend_request",
      { request_id: id },
      async ({ request_id, message }) => {
        dispatch(removeReceivedRequest(request_id));
        enqueueSnackbar(message, { variant: "success" });
        setIsLoading(false);
      }
    );
  };

  const handleDeleteFriendRequest = (id, setIsLoading) => {
    socket.emit(
      "delete_friend_request",
      { request_id: id },
      async ({ message, request_id }) => {
        dispatch(removeSentRequest(request_id));
        enqueueSnackbar(message, { variant: "success" });
        setIsLoading(false);
      }
    );
  };

  return (
    <Stack px={1} py={1} spacing={2} width="100%">
      <Box>
        <Typography
          variant="body2"
          sx={{
            color: mode === "light" ? "grey.500" : "grey.400",
            pb: 1.5,
          }}
        >
          Friend requests
        </Typography>
        <Stack spacing={1.5}>
          {received.length ? (
            received.map((item, index) => (
              <ReceivedFriendRequest
                item={item}
                key={index}
                handleAcceptFriendRequest={handleAcceptFriendRequest}
                handleRejectFriendRequest={handleRejectFriendRequest}
              />
            ))
          ) : (
            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                color: "grey.500",
              }}
            >
              ......
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
            color: mode === "light" ? "grey.500" : "grey.400",
            pb: 1.5,
          }}
        >
          Requests i sent
        </Typography>
        <Stack spacing={1.5}>
          {sent.length ? (
            sent.map((item, index) => (
              <RequestsStatus
                item={item}
                key={index}
                handleDeleteFriendRequest={handleDeleteFriendRequest}
              />
            ))
          ) : (
            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                color: "grey.500",
              }}
            >
              ......
            </Typography>
          )}
        </Stack>
      </Box>
    </Stack>
  );
};

export default FriendsBox;
