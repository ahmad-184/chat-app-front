import { useTheme, alpha, Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ShareFat } from "@phosphor-icons/react";

import ShowReplayMessage from "./ShowReplayMessage";
import { useEffect } from "react";
import {
  findReplayedMessageThunk,
  getAllMessages,
} from "../../../../app/slices/message";

const Replay = ({ textInputRef }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const replay = useSelector((state) => state.message.replay);

  const { hasNextPage } = useSelector((state) => state.message);
  const msgs = useSelector(getAllMessages);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const markAndScrollToMsg = () => {
    const chatView = document.querySelector("#chat_view");
    const msg = chatView?.querySelector(`[id='${replay?._id}']`);
    if (msg) {
      msg?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      msg.style.transition = "background-color 1s ease";
      msg.style.backgroundColor = alpha(theme.palette.primary.main, 0.3);
      msg.style.borderRadius = "10px";
      setTimeout(() => {
        msg.style.backgroundColor = "transparent";
      }, 2500);
      return true;
    } else return false;
  };

  const handleScrollToMsg = async () => {
    const lastScroll = msgs[1];
    const chatView = document.querySelector("#chat_view");
    const msg = chatView?.querySelector(`[id='${replay?._id}']`);
    if (msg) {
      markAndScrollToMsg();
    } else {
      if (hasNextPage) {
        let isLoopRun = false;
        await dispatch(
          findReplayedMessageThunk({
            token,
            conversation_id: replay?.conversation_id,
            message_id: replay?._id,
          })
        ).then((res) => {
          if (res.payload.error) {
            return;
          }
          if (res.payload.status === 200) {
            chatView
              ?.querySelector(`[id='${lastScroll?._id}']`)
              .scrollIntoView({
                block: "center",
              });
            while (isLoopRun === false) {
              const status = markAndScrollToMsg();
              isLoopRun = status;
            }
          }
        });
      }
    }
  };

  useEffect(() => {
    if (textInputRef.current && Object.entries(replay).length)
      textInputRef.current?.focus();
  }, [replay]);

  if (!Object.entries(replay).length) return null;
  return (
    <Box
      px={2}
      py={1}
      sx={{
        backgroundColor:
          mode === "light" ? "grey.200" : alpha(theme.palette.grey[800], 0.8),
        borderTop: "1px solid",
        borderColor: mode === "light" ? "grey.300" : "grey.700",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" width="100%">
        <Box
          sx={{
            lineHeight: 0,
            color: mode === "light" ? "primary.dark" : "primary.light",
            cursor: "pointer",
          }}
          onClick={handleScrollToMsg}
        >
          <ShareFat size={32} weight="fill" />
        </Box>

        {<ShowReplayMessage message={replay} />}
      </Stack>
    </Box>
  );
};

export default Replay;
