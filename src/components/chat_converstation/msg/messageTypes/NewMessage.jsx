import { memo, useEffect, useRef } from "react";
import { Divider, Stack, Typography, useTheme } from "@mui/material";

const NewMessage = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const boxRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current?.scrollIntoView({ block: "end" });
    }
  }, [boxRef]);

  return (
    <Stack direction="row" width="100%" py={1.5} ref={boxRef}>
      <Divider
        variant="fullWidth"
        textAlign="center"
        sx={{
          borderWidth: "1px",
          backgroundColor: "none",
          width: "100%",
          typography: "caption",
          "&::after,::before": {
            borderTop: "1px solid",
            borderColor: mode === "light" ? "error.light" : "error.main",
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: mode === "light" ? "error.main" : "error.main",
            fontSize: "13px",
            fontWeight: "500",
            px: 1.4,
          }}
        >
          NEW MESSAGE
        </Typography>
      </Divider>
    </Stack>
  );
};

export default memo(NewMessage);
