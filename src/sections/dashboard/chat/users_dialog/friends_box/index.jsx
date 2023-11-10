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

import { updateFriendsThunk, getFriends } from "../../../../../app/slices/app";
import { getToken } from "../../../../../app/slices/auth";

import { socket } from "../../../../../socket";

const FriendBox = () => {
  const friends = useSelector(getFriends);
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    dispatch(updateFriendsThunk({ token }));
  }, []);

  const handleStartConversation = async () => {};

  return (
    <Stack px={1} py={1} spacing={1.5} width="100%">
      {friends.length ? (
        friends.map((item, index) => (
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
                <Avatar
                  alt={`${item.firstname} ${item.lastname}`}
                  src={item.avatar}
                />
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
        ))
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
