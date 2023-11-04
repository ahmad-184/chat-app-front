import { Box, Typography, useTheme } from "@mui/material";

const ChatView = () => {
  const mode = useTheme().palette.mode;

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: "calc(100% - 340px)",
          lg: "calc(100% - 375px)",
          // xl: isSidebarOpen ? "calc(100% - 695px)" : "calc(100% - 375px)",
        },
      }}
      backgroundColor={mode === "light" ? "grey.100" : "grey.900"}
    >
      <Typography variant="h4">Chat View</Typography>
    </Box>
  );
};

export default ChatView;
