import { useTheme, alpha, Box, Stack, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  X,
  Image as ImageIcon,
  VideoCamera,
  File,
  Microphone,
} from "@phosphor-icons/react";
import VideoThumbnail from "react-video-thumbnail";

import { Image } from "../../../image";
import { clearReplay } from "../../../../app/slices/message";
import getPhotoUrl from "../../../../utils/getPhotoUrl";
import { useState } from "react";

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
        color: mode === "light" ? "grey.800" : "grey.400",
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

const ShowReplayMessage = ({ message }) => {
  const [thumb, setThumb] = useState("");
  const theme = useTheme();
  const mode = theme.palette.mode;
  const lastFile = message?.files?.[message?.files.length - 1];
  const current_conversation = useSelector(
    (state) => state.conversation.current_conversation
  );
  const { userId, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isImage = Boolean(fileType(lastFile?.type) === "image");
  const isFile = Boolean(fileType(lastFile?.type) === "file");
  const isVideo = Boolean(fileType(lastFile?.type) === "video");
  const isAudio = Boolean(fileType(lastFile?.type) === "audio");
  const text = message?.text;

  return (
    <Stack
      py={1}
      px={2}
      width="100%"
      sx={{
        borderRadius: 1,
        backgroundColor:
          mode === "light"
            ? alpha(theme.palette.grey[900], 0.05)
            : alpha(theme.palette.grey[900], 0.5),
        minWidth: 0,
      }}
      direction="row"
      spacing={1}
      alignItems="center"
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
      <Stack
        direction="column"
        flexGrow={1}
        sx={{
          minWidth: "0px !important",
        }}
      >
        <Stack
          flexGrow={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            variant="body2"
            fontWeight={500}
            noWrap
            sx={{
              color: mode === "light" ? "primary.main" : "primary.light",
              textTransform: "capitalize",
            }}
          >
            {message?.sender === userId
              ? user?.name
              : current_conversation?.users.find(
                  (item) => item?._id === message?.sender
                )?.name || ""}
          </Typography>
          <Box
            sx={{
              lineHeight: 0,
              color: mode === "light" ? "error.dark" : "error.main",
              cursor: "pointer",
            }}
            onClick={() => dispatch(clearReplay())}
          >
            <X size={22} />
          </Box>
        </Stack>
        {text && <Text text={text} />}
        {!text && isImage && (
          <Stack direction="row" spacing={0.5} alignItems="center" minWidth={0}>
            <Text text={"image"} />
            <Icon type={"image"} />
          </Stack>
        )}
        {!text && isFile && (
          <Stack direction="row" spacing={0.5} alignItems="center" minWidth={0}>
            <Text text={lastFile?.file.public_id.split("/")[1]} />
            <Icon type={"file"} />
          </Stack>
        )}
        {!text && isAudio && (
          <Stack direction="row" spacing={0.5} alignItems="center" minWidth={0}>
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

export default ShowReplayMessage;
