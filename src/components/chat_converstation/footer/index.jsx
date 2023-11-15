import { useState } from "react";
import { Button, Stack, Box, useTheme, alpha, IconButton } from "@mui/material";
import { Microphone, PaperPlaneRight, LinkSimple, Image } from "phosphor-react";
import { useSelector } from "react-redux";

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
  const { room_id } = useSelector((state) => state.app);

  const [textInput, setTextInput] = useState();
  const handleChangeTextInput = (text) => setTextInput(text);
  const handleAddEmoji = (emoji) =>
    setTextInput((prev) => `${prev || ""}${emoji}`);

  const handleSendMessage = () => {
    if (!textInput) return;
    socket.emit(
      "send_message",
      { message: textInput, room_id },
      ({ message }) => {
        console.log(message);
      }
    );
  };

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
            textInput={textInput}
            handleChangeTextInput={handleChangeTextInput}
            handleAddEmoji={handleAddEmoji}
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
