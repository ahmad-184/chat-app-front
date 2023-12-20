import { useEffect } from "react";
import { Box, Typography, useTheme, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import ConversationView from "../../../../sections/dashboard/chat/conversation_view";

import NoChat from "../../../../assets/Illustration/NoChat";
import { getCurrentConversation } from "../../../../app/slices/conversation";
import { fetchMessagesThunk } from "../../../../app/slices/message";
import { getToken } from "../../../../app/slices/auth";

import useSocket from "../../../../hooks/useSocket";

const ChatView = () => {
  const mode = useTheme().palette.mode;
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const {
    right_sidebar: { open },
    chat_type,
    room_id,
  } = useSelector((state) => state.app);
  const current_conversation = useSelector(getCurrentConversation);
  const token = useSelector(getToken);

  const isSidebarOpen = Boolean(open);

  useEffect(() => {
    if (chat_type === "dividual" && room_id && current_conversation?._id) {
      socket?.emit(
        "join_a_chat_conversation",
        { room_id },
        ({ message }) => {}
      );
      dispatch(
        fetchMessagesThunk({
          token,
          conversation_id: current_conversation?._id,
        })
      );
    }
    return () => {
      if (chat_type === "dividual" && room_id && current_conversation?._id) {
        socket?.emit(
          "leave_chat_conversation",
          { room_id },
          ({ message }) => {}
        );
      }
    };
  }, [room_id, current_conversation?._id]);

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: "calc(100% - 340px)",
          lg: "calc(100% - 375px)",
          xl: isSidebarOpen ? "calc(100% - 695px)" : "calc(100% - 375px)",
        },
      }}
      backgroundColor={mode === "light" ? "grey.100" : "grey.900"}
    >
      {chat_type === "dividual" && room_id && current_conversation ? (
        <ConversationView />
      ) : (
        <Stack
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          borderBottom={"4px solid"}
          borderColor="primary.main"
        >
          <NoChat />
          <Typography variant="body1">
            Select a converstation or start new one
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default ChatView;
