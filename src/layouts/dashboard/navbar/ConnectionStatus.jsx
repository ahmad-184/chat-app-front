import { memo } from "react";
import { Stack, useTheme, Typography } from "@mui/material";
import {
  WifiHigh,
  WifiSlash,
  WifiMedium,
  WifiLow,
  WifiNone,
} from "phosphor-react";

import useSocket from "../../../hooks/useSocket";

const ConnectionStatus = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const { connection, ping } = useSocket();

  return (
    <>
      <Stack
        sx={{
          ...(connection && {
            color: mode === "light" ? "success.main" : "success.light",
          }),
          ...(!connection && {
            color: mode === "light" ? "error.main" : "error.light",
          }),
        }}
      >
        {connection ? <WifiHigh size={25} /> : <WifiSlash size={25} />}
      </Stack>
      <Typography variant="caption" color="grey.500">
        Ping: {connection && ping ? `${ping}ms` : "...."}
      </Typography>
    </>
  );
};

export default memo(ConnectionStatus);
