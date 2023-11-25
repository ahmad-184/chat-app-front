import { useEffect, useRef, useCallback } from "react";
import { Stack, Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import {
  TextMsg,
  MediaMsg,
  ReplyMsg,
  LinkMsg,
  DocMsg,
  Timeline,
} from "./messageTypes";
import {
  getAllMessages,
  getCurrentConversation,
} from "../../../app/slices/chat_conversation";
import { ArrowDown } from "phosphor-react";

import NewMessage from "./messageTypes/NewMessage";

const Msg = ({ showMenu = true, showTime = true }) => {
  const mode = useTheme().palette.mode;
  const msgs = useSelector(getAllMessages);
  const isLoading = useSelector((state) => state.chat_conversation.loading);
  const { unseen } = useSelector(getCurrentConversation);
  const boxRef = useRef(null);
  const scrollButtonRef = useRef(null);

  const scrollToBottom = () => {
    // const lastMessage = boxRef.current?.lastElementChild;
    // lastMessage?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollDown = () => {
    boxRef?.current?.scroll({
      top: boxRef?.current?.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleActiveScrollButton = (event) => {
    const elem = event?.target || boxRef?.current;
    const active = Boolean(
      elem.scrollTop + elem.clientHeight > elem.scrollHeight - 400
    );
    if (!active) {
      scrollButtonRef.current.style.opacity = 1;
      scrollButtonRef.current.style.visibility = "visible";
    } else {
      scrollButtonRef.current.style.opacity = 0;
      scrollButtonRef.current.style.visibility = "hidden";
    }
  };

  useEffect(() => {
    if (!boxRef.current) return;

    if (boxRef.current) handleActiveScrollButton();

    boxRef.current?.addEventListener("scroll", handleActiveScrollButton);
    return () => {
      boxRef.current?.removeEventListener("scroll", handleActiveScrollButton);
    };
  }, [msgs, boxRef]);

  if (isLoading) {
    return "loading...";
  }

  const firstUnseenMsg = unseen[0];

  return (
    <Box width="100%" position="relative" height="100%">
      <Box
        position="absolute"
        sx={{
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        backgroundColor="grey.700"
        color="white"
        borderRadius="50%"
        p={1}
        bottom={15}
        right={15}
        lineHeight={0}
        zIndex={1}
        ref={scrollButtonRef}
        onClick={handleScrollDown}
        display={Object.keys(msgs).length ? "block" : "none"}
      >
        <ArrowDown size={22} />
      </Box>
      <Stack
        direction="column"
        height="100%"
        width="100%"
        sx={{
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "7px",
          },
          "&::-webkit-scrollbar-track": {},
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: mode === "light" ? "grey.300" : "grey.700",
            borderRadius: "2",
            "&:hover": {
              backgroundColor: mode === "light" ? "grey.400" : "grey.600",
            },
          },
        }}
        spacing={1.5}
        pt={2}
        pb={2}
        px={{ xs: 2, md: 4 }}
        ref={boxRef}
        id="chat_view"
      >
        {msgs?.map((item, index) => {
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
            case "timeline": {
              return (
                <Timeline
                  data={item.date}
                  key={index}
                  showMenu={showMenu}
                  showTime={showTime}
                />
              );
            }
            default: {
              return (
                <>
                  {unseen.length && firstUnseenMsg === item._id ? (
                    <NewMessage />
                  ) : null}
                  <TextMsg
                    data={item}
                    key={index}
                    showMenu={showMenu}
                    showTime={showTime}
                  />
                </>
              );
            }
          }
        })}
      </Stack>
    </Box>
  );
};

export default Msg;
