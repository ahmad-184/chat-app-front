import { Stack, Divider, Typography, useTheme } from "@mui/material";

const About = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Stack width="100%" px={3}>
      <Stack direction="column" spacing={1.5} pb={3}>
        <Typography
          variant="body1"
          fontWeight="500"
          sx={{
            ...(mode === "dark" && {
              fontWeight: "400",
            }),
            color: mode === "light" ? "grey.800" : "grey.300",
          }}
        >
          About
        </Typography>
        <Typography
          variant="body1"
          fontWeight={mode === "light" ? "700" : "500"}
          fontSize={15}
          sx={{
            ...(mode === "dark" && {
              color: "grey.100",
            }),
          }}
        >
          Don't Leave Me This Way, Sunday
        </Typography>
      </Stack>
      <Divider variant="fullWidth" />
    </Stack>
  );
};

export default About;
