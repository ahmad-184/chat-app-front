import { Box, useTheme } from "@mui/material";
import NoChat from "../../../assets/Illustration/NoChat";

const RightPanel = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: "calc(100% - 340px)",
          lg: "calc(100% - 375px)",
        },
        display: {
          xs: "none",
          md: "flex",
        },
        alignItems: "center",
        justifyContent: "center",
      }}
      backgroundColor={mode === "light" ? "grey.100" : "grey.900"}
    >
      <NoChat />
    </Box>
  );
};

export default RightPanel;
