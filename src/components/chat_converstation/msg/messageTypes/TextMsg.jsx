import { useEffect, useRef } from "react";
import { Stack, Box, useTheme, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Check, Checks } from "phosphor-react";

import ShowMsgTime from "./ShowMsgTime";
import Menu from "./Menu";

import { socket } from "../../../../socket";

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /* or $(window).width() */
  );
}

const TextMsg = ({ data, showMenu = true, showTime = true }) => {
  const theme = useTheme();
  const { userId } = useSelector((state) => state.auth);
  const { room_id } = useSelector((state) => state.app);

  const mode = theme.palette.mode;
  const boxRef = useRef(null);

  const isOutgoing = Boolean(data?.sender === userId);

  let isVisible = false;
  let listener = null;

  useEffect(() => {
    if (data?.sender === userId || data?.status === "") return;
    const chatViewBox = document.querySelector("#chat_view");

    listener = chatViewBox.addEventListener("scroll", () => {
      if (Boolean(isVisible)) return;
      const messageText = isElementInViewport(boxRef.current);
      isVisible = Boolean(messageText) ? true : false;
      if (Boolean(isVisible)) {
        socket.emit("get_m", isVisible);
      }
    });

    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [data, room_id]);

  return (
    <Stack
      direction="row"
      ref={boxRef}
      justifyContent={!isOutgoing ? "start" : "end"}
    >
      <Stack spacing={0.7}>
        <Box
          sx={{
            ...(mode === "dark"
              ? {
                  backgroundColor: !isOutgoing ? "grey.800" : "primary.main",
                }
              : {
                  backgroundColor: !isOutgoing ? "grey.800" : "primary.main",
                }),
            borderRadius: 1.4,
            p: 1,
            px: 2,
            position: "relative",
          }}
        >
          {showMenu && <Menu data={data} userId={userId} />}
          <Typography
            variant="body2"
            sx={{
              ...(mode === "dark"
                ? {
                    color: !isOutgoing ? "grey.200" : "grey.200",
                  }
                : {
                    color: !isOutgoing ? "grey.200" : "grey.200",
                  }),
              fontWeight: "500",
            }}
          >
            {data?.text}
          </Typography>
        </Box>
        <Stack
          direction="row"
          justifyContent={isOutgoing && "end"}
          width="100%"
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            color="grey.500"
          >
            {isOutgoing && data?.status === "Created" ? null : isOutgoing &&
              data?.status === "Delivered" ? (
              <Check size={16} weight="bold" />
            ) : isOutgoing && data?.status === "Seen" ? (
              <Checks size={16} weight="bold" />
            ) : null}
            {showTime && data.createdAt && (
              <ShowMsgTime data={data} userId={userId} />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TextMsg;
