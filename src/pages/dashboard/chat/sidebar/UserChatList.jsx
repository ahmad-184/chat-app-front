import { Box, Typography, Stack, useTheme, Avatar, Badge } from "@mui/material";

import StyledBadge from '../../../../components/StyledBadge'

const UserChatList = ({ data }) => {
  const theme = useTheme();

  const mode = theme.palette.mode;

  return (
    <Box
      sx={{
        backgroundColor: mode === "light" ? "grey.50" : "grey.900",
        width: "100%",
        p: 2,
        borderRadius: 2,
        cursor: "pointer",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ minWidth: "0px", maxWidth: "83%" }}
        >
          {data.online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={data.img} alt="user profile picture" />
            </StyledBadge>
          ) : (
            <Avatar src={data.img} alt="user profile picture" />
          )}
          <Stack direction="column" sx={{ minWidth: "0px" }}>
            <Typography variant="body1" fontWeight="600" noWrap>
              {data.name}
            </Typography>
            <Typography
              variant="caption"
              color={mode === "light" ? "grey.600" : "grey.400"}
              noWrap
            >
              {data.msg} {data.msg}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="column" sx={{ minWidth: "0px", maxWidth: "25%" }}>
          <Typography variant="caption" noWrap>
            {data.time}
          </Typography>
          <Box display="flex" justifyContent="end" position="relative">
            <Badge
              badgeContent={data.unread}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  position: "relative",
                  "-webkit-transform": "none",
                  transform: "translateY(5px)",
                  transformOrigin: "none",
                },
              }}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserChatList;
