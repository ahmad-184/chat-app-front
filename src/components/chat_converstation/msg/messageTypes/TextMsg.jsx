import { Stack, Box, useTheme, Typography } from "@mui/material";

import ShowMsgTime from "./ShowMsgTime";
import Menu from "./Menu";

const TextMsg = ({ data, showMenu = true, showTime = true }) => {
  const theme = useTheme();

  const mode = theme.palette.mode;

  const isIncoming = Boolean(data.incoming);
  const isOutgoing = Boolean(data.outgoing);

  return (
    <Stack
      direction="row"
      justifyContent={isIncoming ? "start" : isOutgoing ? "end" : "center"}
    >
      <Box
        sx={{
          ...(mode === "dark"
            ? {
                backgroundColor: isIncoming ? "grey.800" : "primary.main",
              }
            : {
                backgroundColor: isIncoming ? "grey.300" : "primary.main",
              }),
          borderRadius: 1.4,
          p: 1,
          px: 2,
          position: "relative",
        }}
      >
        {showMenu && <Menu data={data} />}
        <Typography
          variant="body2"
          sx={{
            ...(mode === "dark"
              ? {
                  color: isIncoming ? "grey.200" : "grey.200",
                }
              : {
                  color: isIncoming ? "grey.700" : "grey.200",
                }),
            fontWeight: "500",
          }}
        >
          {data.message}
        </Typography>
        {showTime && <ShowMsgTime data={data} />}
      </Box>
    </Stack>
  );
};

export default TextMsg;
