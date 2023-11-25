import { useEffect, useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Avatar,
  useTheme,
  alpha,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ChatTeardropDots } from "phosphor-react";

import {
  updateFriendsThunk,
  getFriends,
  selectConversation,
} from "../../../../../app/slices/app";
import { getToken, getUserId } from "../../../../../app/slices/auth";
import {
  startNewChatConversation,
  addChatConversation,
} from "../../../../../app/slices/chat_conversation";

import createAvatar from "../../../../../utils/createAvatar";

import StyledBadge from "../../../../../components/StyledBadge";
import useSocket from "../../../../../hooks/useSocket";

const FriendBox = ({ handleClose }) => {
  const friends = useSelector(getFriends);
  const token = useSelector(getToken);
  const userId = useSelector(getUserId);
  const dispatch = useDispatch();

  const { socket } = useSocket();

  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    dispatch(updateFriendsThunk({ token }));
  }, []);

  const handleStartConversation = async (friendId) => {
    socket.emit(
      "start_conversation",
      { friend_id: friendId, user_id: userId },
      ({ conversation, messages }) => {
        dispatch(addChatConversation(conversation));
        dispatch(startNewChatConversation({ conversation, messages }));
        setIsLoading(false);
        handleClose(false);
        dispatch(
          selectConversation({
            chat_type: "dividual",
            room_id: conversation._id,
          })
        );
      }
    );
  };

  return (
    <Stack px={1} py={1} spacing={1.5} width="100%">
      {friends.length ? (
        friends.map((item, index) => {
          const avatar = createAvatar(item.firstname);

          return (
            <Box
              sx={{
                p: 1,
                borderRadius: 1,
                cursor: "pointer",
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "grey.200"
                    : alpha(theme.palette.grey[900], 0.4),
              }}
              key={index}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Box p={0.5}>
                  {item.status === "Online" ? (
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar
                        alt={`${item.firstname} ${item.lastname}`}
                        src={item.avatar}
                      >
                        {avatar.name}
                      </Avatar>
                    </StyledBadge>
                  ) : (
                    <Avatar
                      alt={`${item.firstname} ${item.lastname}`}
                      src={item.avatar}
                    >
                      {avatar.name}
                    </Avatar>
                  )}
                </Box>
                <Stack sx={{ minWidth: 0, maxWidth: "45%" }}>
                  <Typography
                    noWrap
                    variant="body1"
                  >{`${item.firstname} ${item.lastname}`}</Typography>
                  <Typography noWrap variant="body2">
                    {item.email}
                  </Typography>
                </Stack>
                <Box display="flex" flexGrow={1} justifyContent="end">
                  <IconButton
                    disabled={isLoading}
                    onClick={() => {
                      handleStartConversation(item._id);
                      setIsLoading(true);
                    }}
                  >
                    <ChatTeardropDots size={33} />
                  </IconButton>
                </Box>
              </Stack>
            </Box>
          );
        })
      ) : (
        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            color: "grey.500",
          }}
        >
          ...You have no friends, you are alone...
        </Typography>
      )}
    </Stack>
  );
};

export default FriendBox;
