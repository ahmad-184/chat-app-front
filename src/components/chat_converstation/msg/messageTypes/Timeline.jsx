import { Stack, Divider, useTheme } from "@mui/material";

const Timeline = ({ text }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Stack direction="row" width="100%" py={2}>
      <Divider
        variant="fullWidth"
        textAlign="center"
        sx={{
          width: "100%",
          borderColor: "grey.700",
          color: mode === "light" ? "grey.500" : "grey.600",
          fontSize: "13px",
          fontWeight: "600",
        }}
      >
        {text}
      </Divider>
    </Stack>
  );
};

export default Timeline;
