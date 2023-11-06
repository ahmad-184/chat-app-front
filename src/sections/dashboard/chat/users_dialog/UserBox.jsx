import { useEffect } from "react";
import {
  Stack,
  Box,
  Typography,
  Avatar,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { updateUsersThunk, getUsers } from "../../../../app/slices/app";
import { getToken, getUserId } from "../../../../app/slices/auth";
import { socket } from "../../../../socket";

import StyledBadge from "../../../../components/StyledBadge";

const UserBox = () => {
  const users = useSelector(getUsers);
  const token = useSelector(getToken);
  const userId = useSelector(getUserId)
  const dispatch = useDispatch();

  const theme = useTheme();

  useEffect(() => {
    dispatch(updateUsersThunk({ token }));
  }, []);

  const handleSendFriendRequest = (user_id) => {
    socket.emit("friend_request", ({to: user_id, from: userId}))
  };

  return (
    <Stack px={1} py={1} spacing={1.5} width="100%">
      {users.map((item, index) => (
        <Box
          sx={{
            p: 1,
            borderRadius: 1,
            // boxShadow: theme.shadows[1],
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
                  />
                </StyledBadge>
              ) : (
                <Avatar
                  alt={`${item.firstname} ${item.lastname}`}
                  src={item.avatar}
                />
              )}
            </Box>
            <Stack sx={{ minWidth: 0, maxWidth: "50%" }}>
              <Typography
                noWrap
                variant="body1"
              >{`${item.firstname} ${item.lastname}`}</Typography>
              <Typography noWrap variant="body2">
                {item.email}
              </Typography>
            </Stack>
            <Box display="flex" flexGrow={1} justifyContent="end">
              <Button
                variant="text"
                onClick={() => handleSendFriendRequest(item._id)}
              >
                Send Request
              </Button>
            </Box>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

export default UserBox;
