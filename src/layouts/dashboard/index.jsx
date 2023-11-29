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
  updateFriendsStatus,
} from "../../app/slices/app";

import {
  addMessage,
  getChatConversations,
  updateChatConversationsStatus,
  updateTypingStatus,
  changeLastMessage,
  addUnseenMsg,
  changeToFirstConversation,
  setMessageSeen,
} from "../../app/slices/chat_conversation";

import useSocket from "../../hooks/useSocket";

const DashboardLayout = () => {
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const { room_id } = useSelector((state) => state.app);
  const conversations = useSelector(getChatConversations);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { socket } = useSocket();

  useEffect(() => {
    if (isLoggedIn && socket && socket.connected) {
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
        const conversation_id = message.conversation_id.toString();
        dispatch(changeToFirstConversation(conversation_id));
        if (conversation_id === room_id) {
          dispatch(addMessage(message));
        } else {
          const conversation = conversations.find(
            (item) => item._id === conversation_id
          );
          dispatch(changeLastMessage(message));
          enqueueSnackbar({
            message: `A message received from ${conversation.name}`,
          });
        }
        dispatch(
          addUnseenMsg({
            msg_id: message._id,
            conv_id: conversation_id,
          })
        );
      });

      socket.on("message_status_changed", ({ message_id, conv_id }) => {
        console.log("yess");
        if (room_id === conv_id) {
          dispatch(setMessageSeen(message_id));
        }
      });
    }

    return () => {
      if (socket) {
        socket?.off("new_friend_request");
        socket?.off("update_friends_status");
        socket?.off("your_request_rejected");
        socket?.off("your_friend_request_accepted");
        socket?.off("request_not_exist");
        socket?.off("new_message");
        socket?.off("message_status_changed");
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

// export default memo(DashboardLayout);
export default DashboardLayout;
