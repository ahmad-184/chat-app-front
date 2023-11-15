import { Typography, Stack, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { toggleSidebar } from "../../../app/slices/app";
import { getCurrentConversation } from "../../../app/slices/chat_conversation";

import createAvatar from "../../../utils/createAvatar";

const User = () => {
  const dispatch = useDispatch();

  const handleToggleSidebar = () => dispatch(toggleSidebar());
  const current_conversation = useSelector(getCurrentConversation);

  const avatar = createAvatar(current_conversation.name);

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        minWidth: "0px",
      }}
    >
      <Avatar
        onClick={handleToggleSidebar}
        src={current_conversation.avatar}
        alt="user profile picture"
        sx={{
          cursor: "pointer",
        }}
      >
        {avatar.name}
      </Avatar>
      <Stack
        direction="column"
        sx={{
          minWidth: "0px",
        }}
      >
        <Typography variant="subtitle1" noWrap>
          {current_conversation.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color:
              current_conversation.status === "Online"
                ? "success.main"
                : "grey.500",
          }}
        >
          {current_conversation.status}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default User;
