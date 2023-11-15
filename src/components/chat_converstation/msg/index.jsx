import { useEffect, useRef } from "react";
import { Stack, Box } from "@mui/material";
import { useSelector } from "react-redux";

import {
  TextMsg,
  MediaMsg,
  ReplyMsg,
  LinkMsg,
  DocMsg,
  Timeline,
} from "./messageTypes";
import { SimpleBarStyle } from "../../Scrollbar";
import { getAllMessages } from "../../../app/slices/chat_conversation";

const Msg = ({ showMenu = true, showTime = true }) => {
  const messages = useSelector(getAllMessages);
  const isLoading = useSelector((state) => state.chat_conversation.loading);
  const boxRef = useRef(null);

  const scrollToBottom = () => {
    const lastMessage = boxRef.current?.lastElementChild;
    lastMessage?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length) scrollToBottom();
  }, [messages]);

  if (isLoading) {
    return "";
  }

  return (
    <Box width="100%" height="100%">
      <SimpleBarStyle
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Stack
          direction="column"
          height="100%"
          spacing={2.5}
          py={2}
          px={{ xs: 2, md: 4 }}
          ref={boxRef}
        >
          {messages.map((item, index) => {
            const msgType = item?.type;

            switch (msgType) {
              case "Image": {
                return (
                  <MediaMsg
                    data={item}
                    key={index}
                    showMenu={showMenu}
                    showTime={showTime}
                  />
                );
              }
              case "Link": {
                return (
                  <LinkMsg
                    data={item}
                    key={index}
                    showMenu={showMenu}
                    showTime={showTime}
                  />
                );
              }
              case "Doc": {
                return (
                  <DocMsg
                    data={item}
                    key={index}
                    showMenu={showMenu}
                    showTime={showTime}
                  />
                );
              }
              case "Replay": {
                return (
                  <ReplyMsg
                    data={item}
                    key={index}
                    showMenu={showMenu}
                    showTime={showTime}
                  />
                );
              }
              default: {
                return (
                  <TextMsg
                    data={item}
                    key={index}
                    showMenu={showMenu}
                    showTime={showTime}
                  />
                );
              }
            }
          })}
        </Stack>
      </SimpleBarStyle>
    </Box>
  );
};

export default Msg;
