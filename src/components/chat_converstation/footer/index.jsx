import { useState, useCallback, useEffect, useTransition } from "react";
import { Button, Stack, Box, useTheme, alpha, IconButton } from "@mui/material";
import { Microphone, PaperPlaneRight, LinkSimple, Image } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";
import ObjectId from "bson-objectid";

import {
  getCurrentConversation,
  addMessage,
  setMessageDelivered,
} from "../../../app/slices/chat_conversation";
import Input from "./Input";
import { fullDate } from "../../../utils/formatTime";
import useSocket from "../../../hooks/useSocket";

const buttons = [
  {
    icon: <Image size={23} weight="regular" />,
  },
  {
    icon: <LinkSimple size={23} weight="regular" />,
  },
  {
    icon: <Microphone size={23} weight="regular" />,
  },
];

const Footer = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const dispatch = useDispatch();
  const { room_id } = useSelector((state) => state.app);
  const userId = useSelector((state) => state.auth.userId);
  const { friend_id, _id, status } = useSelector(getCurrentConversation);

  const { socket } = useSocket();

  const [isPending, startTransition] = useTransition();

  const [message, setMessage] = useState({
    conversation_id: _id,
    type: "Text",
    text: "",
    sender: userId,
    receiver: friend_id,
  });

  const handleChangeTextInput = (text) => {
    setMessage({ ...message, text });
  };

  const handleScrollDown = () => {
    const chatView = document.querySelector("#chat_view");
    chatView?.scroll({
      top: chatView?.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleAddEmoji = (emoji) =>
    setMessage({ ...message, text: `${message.text || ""}${emoji}` });

  const setMessageEmpty = () =>
    setMessage({
      conversation_id: "",
      type: "",
      text: "",
      sender: "",
      receiver: "",
    });

  const handleSendMessage = () => {
    try {
      if (!message.text || !message.text.length || !message.text.trim().length)
        return;

      const newId = new ObjectId().toHexString();
      const data = {
        _id: newId,
        conversation_id: _id,
        type: message.type || "Text",
        text: message.text,
        sender: userId,
        receiver: friend_id,
        status: "Created",
        edited: false,
        createdAt_day: fullDate(Date.now()),
        createdAt: Date.now(),
      };
      startTransition(async () => {
        await dispatch(addMessage(data));
        handleScrollDown();
        setMessageEmpty();
        socket.emit(
          "send_message",
          { message: data, room_id },
          ({ message }) => {
            dispatch(setMessageDelivered(message));
          }
        );
      });
    } catch (err) {
      console.log(err);
    }
  };

  const startTyping = useCallback(
    _.throttle(
      () => {
        if (status === "Offline") return;
        socket.emit("update_typing_status", {
          conversatoin_id: _id,
          user_id: userId,
          typing_status: true,
        });
      },
      3000,
      { trailing: false }
    ),
    [room_id, status]
  );

  const stopTyping = useCallback(
    _.debounce(() => {
      if (status === "Offline") return;
      socket.emit("update_typing_status", {
        conversatoin_id: _id,
        user_id: userId,
        typing_status: false,
      });
    }, 2000),
    [room_id, status]
  );

  useEffect(() => {
    return () => {
      setMessageEmpty();
    };
  }, [room_id]);

  return (
    <Box
      p={2}
      width="100%"
      backgroundColor={mode === "light" ? "#F8FAFF" : "grey.800"}
      borderTop="1px solid"
      borderColor={
        mode === "light" ? alpha(theme.palette.grey[300], 0.5) : "grey.800"
      }
    >
      <Stack direction="row" spacing={2} alignItems="stretch" width="100%">
        <Box display="flex" flexGrow={1}>
          <Input
            textInput={message.text}
            handleChangeTextInput={handleChangeTextInput}
            handleAddEmoji={handleAddEmoji}
            handleSendMessage={handleSendMessage}
            startTyping={startTyping}
            stopTyping={stopTyping}
          />
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          {buttons.map(({ icon }, index) => (
            <IconButton
              sx={{
                color: mode === "light" ? "primary.light" : "primary.lighter",
              }}
              key={index}
            >
              {icon}
            </IconButton>
          ))}
          <Button
            color="primary"
            sx={{
              height: "100%",
              boxShadow: "none",
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
              color: mode === "light" ? "primary.light" : "primary.lighter",
              borderRadius: 1.5,
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.4),
              },
            }}
            variant="contained"
            // disabled={isLoading}
            onClick={handleSendMessage}
          >
            <PaperPlaneRight size={23} weight="fill" />
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
