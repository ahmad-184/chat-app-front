import { Box, useTheme } from "@mui/material";

const SidebarContainer = ({ children, ...props }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Box
      width={{
        xs: "100%",
        md: "340px",
        lg: "375px",
      }}
      height="100vh"
      borderRight="2px solid"
      borderColor={mode === "light" ? "#eef3f9" : "grey.900"}
      display="flex"
      flexDirection="column"
      backgroundColor={mode === "light" ? "grey.200" : "grey.800"}
      {...props}
    >
      {children}
    </Box>
  );
};

export default SidebarContainer;
