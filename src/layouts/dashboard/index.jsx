import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import Navbar from "./navbar";

import {
  addFriend,
  removeSentRequest,
  removeReceivedRequest,
  updateRequest,
  removeUser,
  updateFriendRequestsThunk,
  updateFriendsThunk,
  updateUsersThunk,
} from "../../app/slices/app";

import { socket, socketConnect } from "../../socket";

const DashboardLayout = () => {
  const { isLoggedIn, token, userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const UpdateUsersData = async () => {
      await dispatch(updateUsersThunk({ token }));
      await dispatch(updateFriendsThunk({ token }));
      await dispatch(updateFriendRequestsThunk({ token }));
    };

    if (isLoggedIn) {
      UpdateUsersData();

      if (!socket) {
        socketConnect(userId, token);
      }
      socket.connect();

      socket.on("new_friend_request", async ({ message }) => {
        await dispatch(updateFriendRequestsThunk({ token })).then(() =>
          enqueueSnackbar(message, { variant: "info" })
        );
      });

      socket.on("request_not_exist", async ({ message, request_id }) => {
        dispatch(removeReceivedRequest(request_id));
        enqueueSnackbar(message, { variant: "info" });
      });

      socket.on(
        "your_friend_request_accepted",
        async ({ message, request_id, friend }) => {
          dispatch(
            updateRequest({ request: "sent", request_id, status: "Accepted" })
          );
          dispatch(addFriend(friend));
          dispatch(removeUser(friend._id));
          enqueueSnackbar(message, { variant: "success" });
        }
      );

      socket.on("your_request_rejected", async ({ message, request_id }) => {
        enqueueSnackbar(message, { variant: "error" });
        dispatch(
          updateRequest({ request: "sent", request_id, status: "Rejected" })
        );
      });

      socket.on("error", (data) => {
        enqueueSnackbar(data.message, { variant: "error" });
      });

      socket.on("connect_error", () => {
        enqueueSnackbar("Offline", {
          variant: "error",
        });
      });

      socket.on("reconnect", (attempt) => {
        console, log(attempt);
        enqueueSnackbar("Network connected successfuly", {
          variant: "success",
        });
      });
    }
    return () => {
      socket.off("new_friend_request");
      socket.off("friend_request_sent");
      socket.off("accepted_friend_request");
      socket.off("rejected_friend_request");
      socket.off("get_test");
      socket.off("connect_error");
      socket.off("error");
      socket.off("reconnect_attempt");
      socket.off("reconnect");
      socket.off("request_deleted");
      socket.off("request_rejected");
      socket.off("your_request_rejected");
      socket.off("your_friend_request_accepted");
      socket.off("request_accepted");
      socket.off("request_not_exist");
      socket.off("request_not_exist");
    };
  }, [socket, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/login");
    }
  }, [isLoggedIn]);

  return (
    <Stack direction="row">
      <Navbar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
