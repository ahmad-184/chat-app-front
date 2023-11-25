import { memo } from "react";
import {
  Box,
  Typography,
  Stack,
  useTheme,
  Avatar,
  Badge,
  Skeleton,
  alpha,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import StyledBadge from "../../../../components/StyledBadge";
import {
  getCurrentConversation,
  startChatConversation,
} from "../../../../app/slices/chat_conversation";
import { selectConversation } from "../../../../app/slices/app";

import createAvatar from "../../../../utils/createAvatar";

import {
  format,
  isThisMonth,
  isThisWeek,
  isThisYear,
  isToday,
  isYesterday,
} from "date-fns";
import { fTimestamp } from "../../../../utils/formatTime";

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

const UserBoxSkeleton = () => {
  const mode = useTheme().palette.mode;

  return (
    <Box
      sx={{
        backgroundColor: mode === "light" ? "grey.200" : "grey.900",
        width: "100%",
        p: 2,
        borderRadius: 2,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ minWidth: "0px", maxWidth: "83%" }}
        >
          <Skeleton variant="circular" width="45px" height="45px" />
          <Stack direction="column" sx={{ minWidth: "0px" }}>
            <Skeleton variant="text" width="70px" height="20" />
            <Skeleton variant="text" width="110px" height="20" />
          </Stack>
        </Stack>
        <Stack direction="column" sx={{ minWidth: "0px", maxWidth: "25%" }}>
          <Skeleton variant="text" width="30px" height="20" />
          <Box display="flex" justifyContent="end" position="relative">
            <Skeleton variant="circular" width="20px" height="20" />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

const UserChatList = ({ data }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentChat = useSelector(getCurrentConversation);

  const mode = theme.palette.mode;

  const avatar = createAvatar(data.name);

  const handleSelectConversation = async () => {
    dispatch(selectConversation({ chat_type: "dividual", room_id: data?._id }));
    dispatch(startChatConversation(data?._id));
  };

  if (!data) {
    return <UserBoxSkeleton />;
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
              <Avatar src={data?.avatar} alt="user profile picture">
                {avatar?.name}
              </Avatar>
            </StyledBadge>
          ) : (
            <Avatar src={data?.avatar} alt="user profile picture">
              {avatar?.name}
            </Avatar>
          )}
          <Stack direction="column" spacing={0.5} sx={{ minWidth: "0px" }}>
            <Typography
              variant="body2"
              fontSize={15}
              fontWeight="600"
              sx={{ textTransform: "capitalize" }}
              noWrap
            >
              {data?.name}
            </Typography>
            <Typography
              variant="body2"
              color={mode === "light" ? "grey.600" : "grey.400"}
              noWrap
            >
              {data.typing
                ? "Typing..."
                : data?.last_message.text
                ? data?.last_message.text
                : "..."}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="column" sx={{ minWidth: "0px", maxWidth: "25%" }}>
          <Typography variant="caption" fontSize="12px" noWrap title>
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
