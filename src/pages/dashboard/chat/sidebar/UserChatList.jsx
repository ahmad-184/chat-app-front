import {
  Box,
  Typography,
  Stack,
  useTheme,
  Avatar,
  Badge,
  Skeleton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { faker } from "@faker-js/faker";

import StyledBadge from "../../../../components/StyledBadge";
import {
  getCurrentConversation,
  startChatConversation,
} from "../../../../app/slices/chat_conversation";
import { selectConversation } from "../../../../app/slices/app";

import createAvatar from "../../../../utils/createAvatar";

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
    return (
      <Box
        sx={{
          backgroundColor: mode === "light" ? "grey.200" : "grey.900",
          width: "100%",
          p: 2,
          borderRadius: 2,
          // cursor: "pointer",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
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
  }

  return (
    <Box
      sx={{
        ...(currentChat?._id !== data?._id && {
          backgroundColor: mode === "light" ? "grey.50" : "grey.900",
        }),
        ...(currentChat?._id === data?._id && {
          backgroundColor: mode === "light" ? "grey.300" : "grey.700",
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
          spacing={2}
          alignItems="center"
          sx={{ minWidth: "0px", maxWidth: "83%" }}
        >
          {data?.status === "Online" ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={data?.avatar} alt="user profile picture">
                {avatar.name}
              </Avatar>
            </StyledBadge>
          ) : (
            <Avatar src={data?.avatar} alt="user profile picture">
              {avatar.name}
            </Avatar>
          )}
          <Stack direction="column" spacing={0.5} sx={{ minWidth: "0px" }}>
            <Typography variant="body1" fontWeight="600" noWrap>
              {data?.name}
            </Typography>
            <Typography
              variant="caption"
              color={mode === "light" ? "grey.600" : "grey.400"}
              noWrap
            >
              {data.typing ? "Typing..." : data.last_message.text || "...."}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="column" sx={{ minWidth: "0px", maxWidth: "25%" }}>
          <Typography variant="caption" noWrap>
            {data?.lastSeen || "05:13"}
          </Typography>
          <Box display="flex" justifyContent="end" position="relative">
            <Badge
              badgeContent={data?.unread || 2}
              color="primary"
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

export default UserChatList;
