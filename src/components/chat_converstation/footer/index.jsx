import { useState, useCallback, useEffect } from "react";
import { Button, Stack, Box, useTheme, alpha, IconButton } from "@mui/material";
import { Microphone, PaperPlaneRight, LinkSimple, Image } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";

import {
  getCurrentConversation,
  addMessage,
} from "../../../app/slices/chat_conversation";

import { socket } from "../../../socket";

import Input from "./Input";

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
  const { friend_id, _id } = useSelector(getCurrentConversation);

  const [isLoading, setIsLoading] = useState(false);
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

  const handleAddEmoji = (emoji) =>
    setMessage({ ...message, text: `${message.text || ""}${emoji}` });

  const handleSendMessage = () => {
    if (!message.text) return;
    setIsLoading(true);
    const data = {
      conversation_id: _id,
      type: message.type || "Text",
      text: message.text,
      sender: userId,
      receiver: friend_id,
    };
    socket.emit("send_message", { message: data, room_id }, ({ message }) => {
      dispatch(addMessage(message));
      console.log(message);
      setMessage({
        conversation_id: "",
        type: "",
        text: "",
        sender: "",
        receiver: "",
      });
      setIsLoading(false);
    });
  };

  const startTyping = useCallback(
    _.throttle(
      () => {
        socket.emit("update_typing_status", {
          conversatoin_id: _id,
          user_id: userId,
          typing_status: true,
        });
      },
      1000,
      { trailing: false }
    ),
    [room_id]
  );

  const stopTyping = useCallback(
    _.debounce(() => {
      socket.emit("update_typing_status", {
        conversatoin_id: _id,
        user_id: userId,
        typing_status: false,
      });
    }, 1000),
    [room_id]
  );

  useEffect(() => {
    return () => {
      setMessage({
        conversation_id: "",
        type: "",
        text: "",
        sender: "",
        receiver: "",
      });
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
            disabled={isLoading}
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
