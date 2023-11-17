import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import Navbar from "./navbar";

import {
  addFriend,
  removeReceivedRequest,
  updateRequest,
  removeUser,
  updateFriendRequestsThunk,
  updateFriendsThunk,
  updateUsersThunk,
  updateFriendsStatus,
  appLogout,
} from "../../app/slices/app";
import {
  addMessage,
  getChatConversations,
  getCurrentConversation,
  logOutChatConv,
  updateChatConversationsStatus,
  updateTypingStatus,
  changeLastMessage,
} from "../../app/slices/chat_conversation";

import { socket, socketConnect } from "../../socket";
import { logOut } from "../../app/slices/auth";

const DashboardLayout = () => {
  const { isLoggedIn, token, userId } = useSelector((state) => state.auth);
  const { room_id } = useSelector((state) => state.app);
  const conversations = useSelector(getChatConversations);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLeaveApp = async () => {
    await dispatch(appLogout());
    await dispatch(logOutChatConv());
    await dispatch(logOut());
    await socket.disconnect();
    window.localStorage.removeItem("redux-root");
    window.location = "/auth.login";
    window.location.reload();
  };

  useEffect(() => {
    if (isLoggedIn) {
      const UpdateUsersData = async () => {
        await dispatch(updateUsersThunk({ token }));
        await dispatch(updateFriendsThunk({ token }));
        await dispatch(updateFriendRequestsThunk({ token }));
      };

      UpdateUsersData();
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      if (!socket) {
        socketConnect(userId, token);
      }
      socket.connect();
    }
  }, [isLoggedIn, socket]);

  useEffect(() => {
    if (isLoggedIn && socket) {
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

      socket.on("update_friends_status", (data) => {
        dispatch(updateChatConversationsStatus(data));
        dispatch(updateFriendsStatus(data));
      });

      socket.on("typing", (data) => {
        dispatch(updateTypingStatus(data));
      });

      socket.on("new_message", ({ message }) => {
        console.log(message);
        if (message.conversation_id.toString() === room_id) {
          dispatch(addMessage(message));
        } else {
          const conversation = conversations.find(
            (item) => item._id === message.conversation_id
          );
          dispatch(changeLastMessage(message));
          enqueueSnackbar({
            message: `A message received from ${conversation.name}`,
          });
        }
      });

      socket.on("error", (data) => {
        enqueueSnackbar(data.message, { variant: "error" });
      });

      socket.on("auth_error", (message) => {
        enqueueSnackbar(message, { variant: "error" });
        setTimeout(handleLeaveApp, 4000);
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
      if (socket) {
        socket.off("new_friend_request");
        socket.off("connect_error");
        socket.off("update_friends_status");
        socket.off("error");
        socket.off("reconnect");
        socket.off("your_request_rejected");
        socket.off("your_friend_request_accepted");
        socket.off("request_not_exist");
        socket.off("auth_error");
        socket.off("new_message");
      }
    };
  }, [socket, isLoggedIn, room_id]);

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
