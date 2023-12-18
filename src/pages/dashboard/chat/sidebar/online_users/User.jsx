import { memo, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack, Typography, Box, useTheme, alpha } from "@mui/material";

import {
  startChatConversation,
  getAConversation,
  getConversations,
} from "../../../../../app/slices/chat_conversation";
import createAvatar from "../../../../../utils/createAvatar";
import { selectConversation } from "../../../../../app/slices/app";
import StyledBadge from "../../../../../components/StyledBadge";

import getPhotoUrl from "../../../../../utils/getPhotoUrl";
import { Avatar } from "../../../../../components/image";

const User = ({ id, name, avatar }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const mode = theme.palette.mode;

  const avatarName = createAvatar(name);
  const imgData = useMemo(() => getPhotoUrl(avatar, "300", "10", "", "10"), []);

  const handleSelectConversation = async () => {
    dispatch(selectConversation({ chat_type: "dividual", room_id: id }));
    dispatch(startChatConversation(id));
  };

  return (
    <Stack
      spacing={1}
      alignItems="center"
      sx={{
        cursor: "pointer",
        height: "fit-content",
      }}
      onClick={handleSelectConversation}
    >
      <Box
        sx={{
          pt: 0.7,
          marginBottom: "-28px !important",
          "& .MuiBadge-badge": {
            width: "6px",
            height: "6px",
            minWidth: "3px",
            boxShadow: "0 0 0 1px #fff",
          },
        }}
      >
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
            {avatarName.name}
          </Avatar>
        </StyledBadge>
      </Box>
      <Box
        px={1.5}
        py={1}
        pt={3.3}
        sx={{
          backgroundColor:
            mode === "light"
              ? alpha(theme.palette.grey[300], 0.5)
              : alpha(theme.palette.grey[700], 0.5),
          borderRadius: 1.5,
          width: "90px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="body2"
          noWrap
          sx={{
            color: mode === "light" ? "grey.800" : "grey.100",
            textTransform: "capitalize",
            userSelect: "none",
          }}
          title={name}
        >
          {name && name}
        </Typography>
      </Box>
    </Stack>
  );
};

export default memo(User);
