import { Box, Typography, Stack, useTheme, Avatar, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";

const GroupsList = ({ data }) => {
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

export default GroupsList;

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
