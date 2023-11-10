import { useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

import {
  updateUsersThunk,
  getUsers,
  updateFriendRequestsThunk,
} from "../../../../../app/slices/app";
import { getToken, getUserId } from "../../../../../app/slices/auth";
import { socket } from "../../../../../socket";

import User from "./User";

const UserBox = () => {
  const users = useSelector(getUsers);
  const token = useSelector(getToken);
  const userId = useSelector(getUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUsersThunk({ token }));
  }, []);

  const handleSendFriendRequest = (user_id, setIsLoading) => {
    socket.emit(
      "friend_request",
      { to: user_id, from: userId },
      async (message) => {
        await dispatch(updateFriendRequestsThunk({ token }))
          .then(() => enqueueSnackbar(message, { variant: "success" }))
          .finally(() => setIsLoading(false));
      }
    );
  };

  return (
    <Stack px={1} py={1} spacing={1.5} width="100%">
      {users.length ? (
        users.map((item, index) => (
          <User
            item={item}
            key={index}
            handleSendFriendRequest={handleSendFriendRequest}
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
          ...Therer is no user...
        </Typography>
      )}
    </Stack>
  );
};

export default UserBox;
