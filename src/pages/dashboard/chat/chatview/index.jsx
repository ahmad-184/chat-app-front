import { Box, Typography, useTheme ,Stack} from "@mui/material";
import { useSelector } from "react-redux";

import Converstation from "../../../../components/converstation";

import NoChat from "../../../../assets/Illustration/NoChat";

const ChatView = () => {
  const mode = useTheme().palette.mode;
  const {
    right_sidebar: { open },
    chat_type,
    room_id,
  } = useSelector((state) => state.app);

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
      {chat_type === "dividual" && room_id ? (
        <Converstation />
      ) : (
        <Stack
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <NoChat />
          <Typography variant="body1">
            Select a converstation or start new one
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default ChatView;
