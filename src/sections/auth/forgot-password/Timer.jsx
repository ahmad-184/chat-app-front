import { Typography, Stack } from "@mui/material";

import useTimer from "../../../hooks/useTimer";

export default function Timer({ deadline }) {
  const { minutes, seconds } = useTimer(deadline, 1000);

  const min = minutes <= 9 ? `0${minutes}` : minutes;
  const sec = seconds <= 9 ? `0${seconds}` : seconds;

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="body2">Resend after </Typography>
      <Stack direction="row" spacing={0} alignItems="center">
        <Typography variant="body2">{min}</Typography>
        {" : "}
        <Typography variant="body2">{sec}</Typography>
      </Stack>
    </Stack>
  );
}
