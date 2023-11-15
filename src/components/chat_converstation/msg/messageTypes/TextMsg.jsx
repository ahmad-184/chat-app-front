import { Stack, Box, useTheme, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import ShowMsgTime from "./ShowMsgTime";
import Menu from "./Menu";

const TextMsg = ({ data, showMenu = true, showTime = true }) => {
  const theme = useTheme();
  const { userId } = useSelector((state) => state.auth);

  const mode = theme.palette.mode;

  const isOutgoing = Boolean(data?.sender === userId);

  return (
    <Stack direction="row" justifyContent={!isOutgoing ? "start" : "end"}>
      <Box
        sx={{
          ...(mode === "dark"
            ? {
                backgroundColor: !isOutgoing ? "grey.800" : "primary.main",
              }
            : {
                backgroundColor: !isOutgoing ? "grey.300" : "primary.main",
              }),
          borderRadius: 1.4,
          p: 1,
          px: 2,
          position: "relative",
        }}
      >
        {showMenu && <Menu data={data} userId={userId} />}
        <Typography
          variant="body2"
          sx={{
            ...(mode === "dark"
              ? {
                  color: !isOutgoing ? "grey.200" : "grey.200",
                }
              : {
                  color: !isOutgoing ? "grey.700" : "grey.200",
                }),
            fontWeight: "500",
          }}
        >
          {data?.text}
        </Typography>
        {showTime && <ShowMsgTime data={data} userId={userId} />}
      </Box>
    </Stack>
  );
};

export default TextMsg;
