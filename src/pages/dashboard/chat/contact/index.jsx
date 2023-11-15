import { Drawer, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import MainContent from "./main-content";
import SharedData from "./shared_data";
import StarredMessages from "./starred_messages";
import { getRightSidebar, toggleSidebar } from "../../../../app/slices/app";

import useResponsive from "../../../../hooks/useResponsive";

const Contact = () => {
  const { open, type } = useSelector(getRightSidebar);
  const dispatch = useDispatch();

  const isSizeLg = useResponsive("down", "xl");
  console.log(isSizeLg);

  const theme = useTheme();
  const mode = theme.palette.mode;

  const isSidebarOpen = Boolean(open);

  return (
    <Drawer
      anchor="right"
      open={isSidebarOpen}
      variant={isSizeLg ? "temporary" : "persistent"}
      onClose={() => {
        dispatch(toggleSidebar());
      }}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0,0,0,0)",
          backgroundImage: "none",
        },
        "& .MuiDrawer-paper": {
          width: {
            xs: "100%",
            sm: "320px",
          },
          backgroundImage: "none",
          backgroundColor: mode === "light" ? "#F8FAFF" : "#1A232D",
        },
        "& .MuiPaper-root": {
          boxShadow: `${theme.shadows[2]} !important`,
        },
      }}
      height="100%"
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
    </Drawer>
  );
};

export default Contact;
