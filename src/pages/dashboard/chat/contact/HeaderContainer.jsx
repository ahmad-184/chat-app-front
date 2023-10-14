import { Stack, useTheme } from "@mui/material";

const HeaderContainer = ({ children, ...props }) => {
  const mode = useTheme().palette.mode;

  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{
        height: 80,
        width: "100%",
        alignItems: "center",
        borderBottom: "1px solid",
        px: 3,
        borderColor: `rgba(0,0,0,${mode === "light" ? "0.05" : "0.2"})`,
      }}
      {...props}
    >
      {children}
    </Stack>
  );
};

export default HeaderContainer;
