import { Stack, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import MainContent from "./main-content";
import SharedData from "./shared_data";
import StarredMessages from "./starred_messages";
import { getRightSidebar } from "../../../../app/slices/app";

const Contact = () => {
  const { open, type } = useSelector(getRightSidebar);

  const theme = useTheme();
  const mode = theme.palette.mode;

  const isSidebarOpen = Boolean(open);

  return (
    <Stack
      width={{
        xs: "100%",
        sm: "320px",
      }}
      height="100%"
      sx={{
        backgroundColor: mode === "light" ? "#F8FAFF" : "#1A232D",
        ...(isSidebarOpen
          ? {
              display: "flex",
            }
          : {
              display: "none",
            }),
        position: {
          xs: "fixed",
          xl: "relative",
        },
        zIndex: {
          xs: theme.zIndex.drawer,
          xl: "0",
        },
        top: 0,
        right: 0,
        bottom: 0,
        boxShadow: {
          xs: "none",
          sm: theme.shadows[3],
          xl: theme.shadows[2],
        },
        p: 0,
      }}
    >
      {(() => {
        switch (type) {
          case "CONTACT":
            return <MainContent />;
          case "SHARED":
            return <SharedData />;
          case "STARRED":
            return <StarredMessages />;
          default:
            return null;
        }
      })()}
    </Stack>
  );
};

export default Contact;
