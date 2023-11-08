import { useEffect } from "react";
import {
  Stack,
  Box,
  Typography,
  Avatar,
  useTheme,
  alpha,
  IconButton,
  Skeleton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ChatTeardropDots } from "phosphor-react";

import {
  updateFriendsThunk,
  getFriends,
  getAppLoading,
} from "../../../../app/slices/app";
import { getToken } from "../../../../app/slices/auth";

const FriendBox = () => {
  const friends = useSelector(getFriends);
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const loading = useSelector(getAppLoading);

  const theme = useTheme();

  useEffect(() => {
    dispatch(updateFriendsThunk({ token }));
  }, []);

  if (!friends.length && loading) {
    return (
      <Stack px={1} py={1} spacing={1.5} width="100%">
        {[...Array(3)].map((_, index) => (
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              cursor: "pointer",
              backgroundColor: "transparent",
              border: "1px solid",
              borderColor:
                theme.palette.mode === "light" ? "grey.200" : "grey.700",
            }}
            key={index}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box p={0.5}>
                <Skeleton
                  variant="circular"
                  animation="wave"
                  width={45}
                  height={45}
                />
              </Box>
              <Stack sx={{ maxWidth: "50%" }}>
                <Skeleton animation="wave" width={"80px"} height={"30px"} />
                <Skeleton animation="wave" width={"130px"} height={"30px"} />
              </Stack>
              <Stack
                display="flex"
                flexGrow={1}
                justifyContent="end"
                spacing={1}
                direction="row"
                alignItems="center"
              >
                <Skeleton
                  variant="circular"
                  animation="wave"
                  width={35}
                  height={35}
                />
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    );
  }

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
                <IconButton>
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
