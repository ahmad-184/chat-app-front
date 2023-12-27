import { memo } from "react";
import { Box, Typography, Stack, useTheme, Badge, alpha } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  Image as ImageIcon,
  VideoCamera,
  File,
  Microphone,
} from "@phosphor-icons/react";

import StyledBadge from "../../../../../components/StyledBadge";
import {
  getCurrentConversation,
  startConversation,
} from "../../../../../app/slices/conversation";
import { resetMessagePage } from "../../../../../app/slices/message";
import { selectConversation } from "../../../../../app/slices/app";

import createAvatar from "../../../../../utils/createAvatar";

import { format, isThisWeek, isThisYear, isToday } from "date-fns";
import { fTimestamp } from "../../../../../utils/formatTime";
import getPhotoUrl from "../../../../../utils/getPhotoUrl";
import { Avatar } from "../../../../../components/image";

import UserSkeleton from "./UserSkeleton";

const time = (data) => {
  const HM = data.lastSeen ? format(fTimestamp(data?.lastSeen), "HH:mm") : "";
  const day = data.lastSeen ? format(fTimestamp(data?.lastSeen), "dd") : "";
  const weekDay = data.lastSeen ? format(fTimestamp(data?.lastSeen), "EE") : "";
  const month = data.lastSeen ? format(fTimestamp(data?.lastSeen), "MMM") : "";
  const year = data.lastSeen ? format(fTimestamp(data?.lastSeen), "yyyy") : "";

  const isDateForToday = data.lastSeen
    ? isToday(fTimestamp(data?.lastSeen))
    : "";
  const isDateForThisWeek = data.lastSeen
    ? isThisWeek(fTimestamp(data?.lastSeen))
    : "";
  const isDateForThisYear = data.lastSeen
    ? isThisYear(fTimestamp(data?.lastSeen))
    : "";
  return (
    <>
      {`${isDateForToday ? HM : ""} `}
      {`${!isDateForToday && isDateForThisWeek ? weekDay : ""} `}
      {`${
        !isDateForToday && !isDateForThisWeek && isDateForThisYear
          ? `${day} ${month}`
          : ""
      } `}
      {`${
        !isDateForToday && !isDateForThisWeek && !isDateForThisYear
          ? `${day} ${month} ${year}`
          : ""
      } `}
    </>
  );
};

const FileIcon = ({ fileType, showName }) => {
  const isImage = Boolean(fileType && fileType === "image");
  const isVideo = Boolean(fileType && fileType === "video");
  const isAudio = Boolean(fileType && fileType === "audio");

  const styles = {
    fontSize: "17px",
    marginLeft: "3px",
  };

  return (
    <>
      {showName && isImage ? "image" : ""}
      {showName && isVideo ? "video" : ""}
      {showName && isAudio ? "audio" : ""}
      {showName && !isImage && !isVideo && !isAudio ? "file" : ""}
      {isImage && <ImageIcon style={styles} />}
      {isVideo && <VideoCamera style={styles} />}
      {isAudio && <Microphone style={styles} />}
      {!isImage && !isVideo && !isAudio && <File style={styles} />}
    </>
  );
};

const UserChatList = ({ data }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentChat = useSelector(getCurrentConversation);
  const { room_id } = useSelector((state) => state.app);

  const mode = theme.palette.mode;

  const avatar = createAvatar(data.name);

  const handleSelectConversation = async () => {
    if (data?._id === room_id) return;
    dispatch(selectConversation({ chat_type: "dividual", room_id: data?._id }));
    dispatch(startConversation(data?._id));
    dispatch(resetMessagePage());
  };

  const fileType = data?.last_message?.files?.length
    ? data?.last_message?.files?.at(-1).type
    : [];

  const text = data?.last_message?.text ? data?.last_message?.text : "";

  const isMessageDeleted = Boolean(data?.last_message?.deleted);

  const imgData = getPhotoUrl(data?.avatar, "300", "10", "", "10");

  if (!data) {
    return <UserSkeleton />;
  }

  return (
    <Box
      sx={{
        ...(currentChat?._id !== data?._id && {
          backgroundColor: mode === "light" ? "grey.50" : "grey.900",
        }),
        ...(currentChat?._id === data?._id && {
          backgroundColor:
            mode === "light"
              ? alpha(theme.palette.primary.lighter, 0.25)
              : alpha(theme.palette.primary.lighter, 0.1),
        }),
        width: "100%",
        p: 2,
        borderRadius: 2,
        cursor: "pointer",
      }}
      onClick={handleSelectConversation}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{ minWidth: "0px", maxWidth: "80%" }}
        >
          {data?.status === "Online" ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                src={imgData.url}
                placeholder={imgData.placeholder}
                alt="user profile picture"
              >
                {avatar.name}
              </Avatar>
            </StyledBadge>
          ) : (
            <Avatar
              src={imgData.url}
              placeholder={imgData.placeholder}
              alt="user profile picture"
            >
              {avatar.name}
            </Avatar>
          )}
          <Stack direction="column" sx={{ minWidth: "0px" }}>
            <Typography
              variant="body1"
              fontWeight="600"
              noWrap
              textTransform="capitalize"
            >
              {data?.name}
            </Typography>
            <Typography
              variant="caption"
              color={
                isMessageDeleted
                  ? mode === "light"
                    ? "error.dark"
                    : "error.light"
                  : mode === "light"
                  ? "grey.600"
                  : "grey.400"
              }
              noWrap
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              {isMessageDeleted && "This message is deleted"}
              {data.typing && "Typing..."}
              {!isMessageDeleted && !data.typing && text ? text : ""}
              {!isMessageDeleted && fileType.length && !data.typing ? (
                <FileIcon fileType={fileType} showName={!text} />
              ) : null}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="column" sx={{ minWidth: "0px", maxWidth: "25%" }}>
          <Typography variant="caption" fontSize="12px" noWrap>
            {data?.lastSeen && time(data)}
          </Typography>
          <Box display="flex" justifyContent="end" position="relative">
            <Badge
              badgeContent={data?.unseen.length}
              color="info"
              variant="standard"
              sx={{
                "& .MuiBadge-badge": {
                  position: "relative",
                  "-webkit-transform": "none",
                  transform: "translateY(5px)",
                  transformOrigin: "none",
                },
              }}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default memo(UserChatList);
