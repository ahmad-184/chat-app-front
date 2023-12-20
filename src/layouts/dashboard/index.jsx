import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "./navbar";

import {
  addFriend,
  removeReceivedRequest,
  updateRequest,
  removeUser,
  updateFriendRequestsThunk,
  updateFriendsStatus,
} from "../../app/slices/app";
import { verifyTokenThunk } from "../../app/slices/auth";

import {
  updateConversationStatus,
  updateTypingStatus,
  changeLastMessage,
  changeToFirstConversation,
  fetchConversationsThunk,
  addUnseenMsg,
  getConversations,
  deleteConversationsLastMessage,
} from "../../app/slices/conversation";
import {
  addMessage,
  setMessageSeen,
  deleteMessage,
} from "../../app/slices/message";

import useSocket from "../../hooks/useSocket";
import {
  errorToast,
  successToast,
  infoToast,
  newFriendRequestToast,
} from "../../components/ToastProvider";
import { toast } from "sonner";

const DashboardLayout = () => {
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const { room_id } = useSelector((state) => state.app);
  const conversations = useSelector(getConversations);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { socket, logout } = useSocket();

  useEffect(() => {
    if (isLoggedIn) {
      socket.on("new_friend_request", async ({ user_name }) => {
        await dispatch(updateFriendRequestsThunk({ token }));
        newFriendRequestToast({ user_name, position: "top-left" });
      });

      socket.on("request_not_exist", async ({ message, request_id }) => {
        dispatch(removeReceivedRequest(request_id));
        infoToast({ message });
      });

      socket.on(
        "your_friend_request_accepted",
        async ({ message, request_id, friend }) => {
          dispatch(
            updateRequest({ request: "sent", request_id, status: "Accepted" })
          );
          dispatch(addFriend(friend));
          dispatch(removeUser(friend._id));
          successToast({ message, position: "top-left" });
        }
      );

      socket.on("your_request_rejected", async ({ message, request_id }) => {
        errorToast({ message, position: "top-left" });
        dispatch(
          updateRequest({ request: "sent", request_id, status: "Rejected" })
        );
      });

      socket.on("update_friends_status", (data) => {
        dispatch(updateConversationStatus(data));
        dispatch(updateFriendsStatus(data));
      });

      socket.on("typing", (data) => {
        dispatch(updateTypingStatus(data));
      });

      socket.on("new_message", async ({ message }) => {
        const conversation_id = message.conversation_id.toString();
        const conversation = conversations.find(
          (item) => item._id === conversation_id
        );
        if (!conversation) {
          await dispatch(fetchConversationsThunk({ token }));
        }

        if (conversation_id === room_id) {
          dispatch(addMessage(message));
          dispatch(changeLastMessage(message));
        } else {
          if (!conversation) return;
          dispatch(changeLastMessage(message));
          toast(`New message received from ${conversation?.name}`, {
            position: "top-left",
          });
          dispatch(
            addUnseenMsg({
              msg_id: message._id,
              conv_id: conversation_id,
            })
          );
        }
        if (!conversation) return;
        dispatch(changeToFirstConversation(conversation_id));
      });

      socket.on("message_status_changed", ({ message_id, conv_id }) => {
        if (room_id === conv_id) {
          dispatch(setMessageSeen(message_id));
        }
      });

      socket.on("delete_message", ({ message_id, conv_id }) => {
        if (room_id === conv_id) {
          dispatch(deleteMessage(message_id));
          dispatch(deleteConversationsLastMessage(message_id));
        }
      });
    }

    return () => {
      socket?.off("new_friend_request");
      socket?.off("update_friends_status");
      socket?.off("your_request_rejected");
      socket?.off("your_friend_request_accepted");
      socket?.off("request_not_exist");
      socket?.off("new_message");
      socket?.off("message_status_changed");
    };
  }, [socket, isLoggedIn, room_id]);

  useEffect(() => {
    if (isLoggedIn) {
      const promise = async () => {
        return new Promise(async (resolve, reject) => {
          await dispatch(verifyTokenThunk({ token })).then((response) => {
            console.log(response);
            if (
              response.payload.data &&
              response.payload.data.status === "OK"
            ) {
              resolve();
            } else return reject(response.payload.message);
          });
        });
      };

      toast.promise(promise, {
        loading: "Verifying user...",
        success: "User verifyed successfully",
        error: (message) => {
          setTimeout(logout, 4000);
          return `${message}`;
        },
        position: "top-right",
      });
    }
  }, [isLoggedIn]);

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
