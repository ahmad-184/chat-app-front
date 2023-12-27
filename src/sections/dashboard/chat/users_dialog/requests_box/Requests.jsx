import { useState, memo } from "react";
import {
  Stack,
  Box,
  Typography,
  useTheme,
  Button,
  alpha,
  Chip,
  IconButton,
} from "@mui/material";
import { Trash, Check } from "@phosphor-icons/react";

import getPhotoUrl from "../../../../../utils/getPhotoUrl";
import createAvatar from "../../../../../utils/createAvatar";
import { Avatar } from "../../../../../components/image";

const ReceivedFriendRequest = ({
  item: { sender, _id },
  handleAcceptFriendRequest,
  handleRejectFriendRequest,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const mode = theme.palette.mode;

  const imgData = getPhotoUrl(sender?.avatar, "300", "10", "", "10");
  const avatar = createAvatar(sender?.name);

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
          <Avatar src={imgData?.url} placeholder={imgData?.placeholder}>
            {avatar?.name}
          </Avatar>
        </Box>
        <Stack sx={{ minWidth: 0, maxWidth: "50%" }}>
          <Typography
            noWrap
            textTransform="capitalize"
            fontWeight={600}
            variant="body1"
          >
            {sender.name}
          </Typography>
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

const RequestsStatus = ({
  item: { reciver, _id, status },
  handleDeleteFriendRequest,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const mode = theme.palette.mode;

  const imgData = getPhotoUrl(reciver?.avatar, "300", "10", "", "10");
  const avatar = createAvatar(reciver?.name);

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
          <Avatar src={imgData?.url} placeholder={imgData?.placeholder}>
            {avatar?.name}
          </Avatar>
        </Box>
        <Stack sx={{ minWidth: 0, maxWidth: "50%" }}>
          <Typography
            noWrap
            textTransform="capitalize"
            fontWeight={600}
            variant="body1"
          >
            {reciver.name}
          </Typography>
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

export default {
  RequestsStatus: memo(RequestsStatus),
  ReceivedFriendRequest: memo(ReceivedFriendRequest),
};
