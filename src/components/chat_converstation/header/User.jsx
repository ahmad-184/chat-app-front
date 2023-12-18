import { Typography, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { toggleSidebar } from "../../../app/slices/app";
import { getCurrentConversation } from "../../../app/slices/chat_conversation";
import { Avatar } from "../../image";
import getPhotoUrl from "../../../utils/getPhotoUrl";

import createAvatar from "../../../utils/createAvatar";

const User = () => {
  const dispatch = useDispatch();

  const handleToggleSidebar = () => dispatch(toggleSidebar());
  const current_conversation = useSelector(getCurrentConversation);

  const avatar = createAvatar(current_conversation.name);
  const imgData = getPhotoUrl(
    current_conversation?.avatar,
    "300",
    "10",
    "",
    "10"
  );

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
        src={imgData.url}
        placeholder={imgData.placeholder}
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
            color: "grey.500",
            // current_conversation.status === "Online"
            //   ? "success.main"
            //   : "grey.500",
          }}
        >
          {current_conversation.typing
            ? "Typing..."
            : current_conversation.status}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default User;
