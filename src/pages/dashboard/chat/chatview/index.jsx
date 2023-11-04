import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import Converstation from "../../../../components/converstation";
import { getRightSidebar } from "../../../../app/slices/app";

const ChatView = () => {
  const mode = useTheme().palette.mode;
  const { open } = useSelector(getRightSidebar);

  const isSidebarOpen = Boolean(open);

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: "calc(100% - 340px)",
          lg: "calc(100% - 375px)",
          xl: isSidebarOpen ? "calc(100% - 695px)" : "calc(100% - 375px)",
        },
      }}
      backgroundColor={mode === "light" ? "grey.100" : "grey.900"}
    >
      <Converstation />
    </Box>
  );
};

export default ChatView;
