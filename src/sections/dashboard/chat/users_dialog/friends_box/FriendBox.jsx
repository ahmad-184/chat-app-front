import { memo } from "react";
import {
  Stack,
  Box,
  Typography,
  useTheme,
  alpha,
  IconButton,
} from "@mui/material";
import { ChatTeardropDots } from "@phosphor-icons/react";

import StyledBadge from "../../../../../components/StyledBadge";

import getPhotoUrl from "../../../../../utils/getPhotoUrl";
import createAvatar from "../../../../../utils/createAvatar";
import { Avatar } from "../../../../../components/image";

const FriendBox = ({
  item,
  isLoading,
  handleStartConversation,
  setIsLoading,
}) => {
  const theme = useTheme();

  const imgData = getPhotoUrl(item?.avatar, "300", "10", "", "10");
  const avatar = createAvatar(item?.name);

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
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Box p={0.5}>
          {item?.status === "Online" ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={imgData?.url} placeholder={imgData?.placeholder}>
                {avatar?.name}
              </Avatar>
            </StyledBadge>
          ) : (
            <Avatar src={imgData?.url} placeholder={imgData?.placeholder}>
              {avatar?.name}
            </Avatar>
          )}
        </Box>
        <Stack sx={{ minWidth: 0, maxWidth: "45%" }}>
          <Typography
            noWrap
            textTransform="capitalize"
            fontWeight={600}
            variant="body1"
          >
            {item?.name}
          </Typography>
          <Typography noWrap variant="body2">
            {item?.email}
          </Typography>
        </Stack>
        <Box display="flex" flexGrow={1} justifyContent="end">
          <IconButton
            disabled={isLoading}
            onClick={() => {
              handleStartConversation(item?._id);
              setIsLoading(true);
            }}
          >
            <ChatTeardropDots size={33} />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default memo(FriendBox);
