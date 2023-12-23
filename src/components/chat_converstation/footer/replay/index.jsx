import { useTheme, alpha, Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { ArrowBendUpRight } from "phosphor-react";

import ShowReplayMessage from "./ShowReplayMessage";
import { useEffect } from "react";

const Replay = ({ textInputRef }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const replay = useSelector((state) => state.message.replay);

  const handleScrollToMsg = () => {
    const chatView = document.querySelector("#chat_view");
    const msg = chatView?.querySelector(`[id='${replay?._id}']`);
    if (msg) {
      msg?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      msg.style.outline = `2px solid ${theme.palette.warning.main}`;
      msg.style.borderRadius = "3px";
      msg.style.outlineOffset = "5px";
      setTimeout(() => {
        msg.style.outline = "none";
      }, 2500);
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
          <ArrowBendUpRight size={26} weight="bold" />
        </Box>

        {<ShowReplayMessage message={replay} />}
      </Stack>
    </Box>
  );
};

export default Replay;
