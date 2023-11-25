import { useEffect, useRef } from "react";
import { Divider, Stack, Typography, useTheme } from "@mui/material";

const NewMessage = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const boxRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) {
      const chatView = document
        .querySelector("#chat_view")
        .getAttribute("new_message");
      console.log(chatView);
    }
    // const d = document.getElementById('f').scrollIntoView({block: "start"})
  }, [boxRef]);

  return (
    <Stack direction="row" width="100%" py={1.5} ref={boxRef} new_message>
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

export default NewMessage;
