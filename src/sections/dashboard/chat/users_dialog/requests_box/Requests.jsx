import { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Avatar,
  useTheme,
  Button,
  alpha,
  Chip,
  IconButton,
} from "@mui/material";
import { Trash, Check } from "phosphor-react";

export const ReceivedFriendRequest = ({
  item: { sender, _id },
  handleAcceptFriendRequest,
  handleRejectFriendRequest,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Box
      sx={{
        p: 1,
        borderRadius: 1,
        cursor: "pointer",
        backgroundColor:
          mode === "light" ? "grey.200" : alpha(theme.palette.grey[900], 0.4),
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Box p={0.5}>
          <Avatar
            alt={`${sender.firstname} ${sender.lastname}`}
            src={sender.avatar}
          />
        </Box>
        <Stack sx={{ minWidth: 0, maxWidth: "50%" }}>
          <Typography
            noWrap
            variant="body1"
          >{`${sender.firstname} ${sender.lastname}`}</Typography>
          <Typography noWrap variant="body2">
            {sender.email}
          </Typography>
        </Stack>
        <Stack
          display="flex"
          flexGrow={1}
          justifyContent="end"
          spacing={1}
          direction="row"
          alignItems="center"
        >
          <Button
            variant="text"
            color="info"
            disabled={isLoading}
            sx={{ boxShadow: "none" }}
            onClick={() => {
              handleAcceptFriendRequest(_id, setIsLoading);
              setIsLoading(true);
            }}
          >
            Accept
          </Button>
          <Button
            disabled={isLoading}
            variant="text"
            color="inherit"
            onClick={() => {
              handleRejectFriendRequest(_id, setIsLoading);
              setIsLoading(true);
            }}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export const RequestsStatus = ({
  item: { reciver, _id, status },
  handleDeleteFriendRequest,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Box
      sx={{
        p: 1,
        borderRadius: 1,
        cursor: "pointer",
        backgroundColor:
          mode === "light" ? "grey.200" : alpha(theme.palette.grey[900], 0.4),
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Box p={0.5}>
          <Avatar
            alt={`${reciver.firstname} ${reciver.lastname}`}
            src={reciver.avatar}
          />
        </Box>
        <Stack sx={{ minWidth: 0, maxWidth: "50%" }}>
          <Typography
            noWrap
            variant="body1"
          >{`${reciver.firstname} ${reciver.lastname}`}</Typography>
          <Typography noWrap variant="body2">
            {reciver.email}
          </Typography>
        </Stack>
        <Stack
          display="flex"
          flexGrow={1}
          justifyContent="end"
          spacing={1}
          direction="row"
          alignItems="center"
        >
          <Chip
            label={
              status === "Accepted" ? (
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography variant="inherit">{status}</Typography>
                  <Check size={19} weight="bold" />
                </Stack>
              ) : (
                status
              )
            }
            size="medium"
            sx={{
              color: "grey.100",
              fontWeight: "600",
              ...(mode === "light" &&
                status === "Accepted" && {
                  backgroundColor: "grey.700",
                }),
              ...(status === "Rejected" && {
                backgroundColor: "error.dark",
              }),
            }}
            color={
              status === "Pending"
                ? "primary"
                : status === "Rejected"
                ? "error"
                : "default"
            }
          />
          <IconButton
            color="error"
            disabled={isLoading}
            onClick={() => {
              handleDeleteFriendRequest(_id, setIsLoading);
              setIsLoading(true);
            }}
          >
            <Trash size={22} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};
