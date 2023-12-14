import { Stack, Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { Check, Checks } from "phosphor-react";

import ShowMsgTime from "./ShowMsgTime";
import Menu from "./Menu";

const MsgContainer = ({ data, showMenu = true, showTime = true, children }) => {
  const theme = useTheme();
  const { userId } = useSelector((state) => state.auth);

  const mode = theme.palette.mode;
  const isOutgoing = Boolean(data?.sender === userId);

  return (
    <Stack spacing={0.7}>
      <Box
        sx={{
          ...(mode === "dark"
            ? {
                backgroundColor: !isOutgoing ? "primary.dark" : "grey.700",
              }
            : {
                backgroundColor: !isOutgoing ? "primary.main" : "grey.800",
              }),
          borderRadius: 1.4,
          p: 1,
          px: 2,
          position: "relative",
        }}
      >
        {showMenu && <Menu data={data} userId={userId} />}
        {children}
      </Box>
      <Stack direction="row" justifyContent={isOutgoing && "end"} width="100%">
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          color="grey.500"
        >
          {isOutgoing && data?.status === "Delivered" ? (
            <Check size={16} weight="bold" />
          ) : isOutgoing && data?.status === "Seen" ? (
            <Checks size={16} weight="bold" />
          ) : null}
          {showTime && data?.createdAt && (
            <ShowMsgTime data={data} userId={userId} />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MsgContainer;
