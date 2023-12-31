import { useTheme, alpha, Box, Stack, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  Image as ImageIcon,
  VideoCamera,
  File,
  Microphone,
} from "@phosphor-icons/react";
import VideoThumbnail from "react-video-thumbnail";

import { Image } from "../../../image";
import getPhotoUrl from "../../../../utils/getPhotoUrl";
import { useState } from "react";
import {
  findReplayedMessageThunk,
  getAllMessages,
} from "../../../../app/slices/message";

const fileType = (type) => {
  if (!type) return null;
  switch (type) {
    case "image": {
      return "image";
    }
    case "video": {
      return "video";
    }
    case "audio": {
      return "audio";
    }
    default: {
      return "file";
    }
  }
};

const Text = ({ text }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Typography
      variant="body2"
      sx={{
        color: mode === "light" ? "grey.600" : "grey.500",
      }}
      noWrap
    >
      {text}
    </Typography>
  );
};

const Icon = ({ type }) => {
  return (
    <Box sx={{ color: "grey.600", lineHeight: 0 }}>
      {type === "image" ? <ImageIcon size={17} weight="light" /> : ""}
      {type === "file" ? <File size={17} /> : ""}
      {type === "audio" ? <Microphone size={17} /> : ""}
      {type === "video" ? <VideoCamera size={17} /> : ""}
    </Box>
  );
};

const ReplayMessage = ({ message, width }) => {
  const [thumb, setThumb] = useState("");
  const theme = useTheme();
  const mode = theme.palette.mode;
  const lastFile = message?.replay?.files?.[message?.replay?.files.length - 1];
  const current_conversation = useSelector(
    (state) => state.conversation.current_conversation
  );
  const { hasNextPage } = useSelector((state) => state.message);
  const msgs = useSelector(getAllMessages);
  const dispatch = useDispatch();
  const { userId, user, token } = useSelector((state) => state.auth);
  const isImage = Boolean(fileType(lastFile?.type) === "image");
  const isFile = Boolean(fileType(lastFile?.type) === "file");
  const isVideo = Boolean(fileType(lastFile?.type) === "video");
  const isAudio = Boolean(fileType(lastFile?.type) === "audio");
  const text = message?.replay?.text;

  const isOutgoing = Boolean(message?.sender === userId);

  const markAndScrollToMsg = () => {
    const chatView = document.querySelector("#chat_view");
    const msg = chatView?.querySelector(`[id='${message?.replay?._id}']`);
    if (msg) {
      msg?.scrollIntoView({
        block: "center",
        // behavior: "smooth",
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
    const msg = chatView?.querySelector(`[id='${message?.replay?._id}']`);
    if (msg) {
      markAndScrollToMsg();
    } else {
      if (hasNextPage) {
        let isLoopRun = false;
        await dispatch(
          findReplayedMessageThunk({
            token,
            conversation_id: message?.conversation_id,
            message_id: message?.replay?._id,
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

  return (
    <Stack
      py={1}
      px={2}
      width={width}
      sx={{
        cursor: "pointer",
        borderRadius: 1,
        position: "relative",
        backgroundColor:
          mode === "light"
            ? isOutgoing
              ? alpha(theme.palette.grey[700], 0.3)
              : alpha(theme.palette.primary.dark, 0.1)
            : alpha(theme.palette.grey[900], 0.66),
        "&::before": {
          content: "''",
          position: "absolute",
          left: "6px",
          width: "3px",
          zIndex: 2,
          height: "40px",
          borderRadius: "16px 0px 0px 16px",
          backgroundColor: isOutgoing
            ? "grey.500"
            : mode === "light"
            ? alpha(theme.palette.primary.light, 0.4)
            : alpha(theme.palette.primary.lighter, 0.6),
        },
      }}
      minWidth={200}
      direction="row"
      spacing={1}
      alignItems="center"
      onClick={handleScrollToMsg}
    >
      {isImage && (
        <Image
          width={40}
          height={40}
          src={getPhotoUrl(lastFile.file.url, "350", "10").url}
          placeholder={
            getPhotoUrl(lastFile.file.url, "30", "20", "30", "10").placeholder
          }
          sx={{
            borderRadius: 1,
          }}
        />
      )}
      {isVideo && (
        <Image
          width={40}
          height={40}
          src={thumb}
          sx={{
            borderRadius: 1,
          }}
        />
      )}
      <Stack direction="column" flexGrow={1} minWidth={0}>
        <Stack
          flexGrow={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          minWidth={0}
        >
          <Typography
            variant="body2"
            fontWeight={500}
            noWrap
            sx={{
              ...(isOutgoing
                ? {
                    color:
                      mode === "light"
                        ? "grey.500"
                        : alpha(theme.palette.grey[400], 0.8),
                  }
                : {
                    color:
                      mode === "light"
                        ? alpha(theme.palette.primary.light, 0.8)
                        : alpha(theme.palette.primary.lighter, 0.7),
                  }),
              textTransform: "capitalize",
              fontWeight: "600",
            }}
          >
            {message?.sender === userId
              ? user?.name
              : current_conversation?.users.find(
                  (item) => item?._id === message?.replay?.sender
                )?.name || ""}
          </Typography>
        </Stack>
        {text && <Text text={text} />}
        {!text && isImage && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Text text={"image"} />
              <Icon type={"image"} />
            </Stack>
          </Stack>
        )}
        {!text && isFile && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Text text={lastFile?.file.public_id.split("/")[1]} />
            <Icon type={"file"} />
          </Stack>
        )}
        {!text && isAudio && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Text text={"audio file"} />
            <Icon type={"audio"} />
          </Stack>
        )}
        {!text && isVideo && (
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              "& .react-thumbnail-generator": {
                display: "none",
              },
            }}
          >
            <VideoThumbnail
              videoUrl={lastFile?.file?.url}
              thumbnailHandler={(thumbnail) => setThumb(thumbnail)}
            />
            <Text text={"video"} />
            <Icon type={"video"} />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default ReplayMessage;
