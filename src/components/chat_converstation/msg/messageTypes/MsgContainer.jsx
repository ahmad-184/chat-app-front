import { Stack, Box, useTheme, alpha, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Check, Checks } from "phosphor-react";

import ShowMsgTime from "./ShowMsgTime";
import Menu from "./Menu";

const MsgContainer = ({ data, showMenu = true, showTime = true, children }) => {
  const theme = useTheme();
  const { userId } = useSelector((state) => state.auth);

  const isDeleted = Boolean(data?.deleted);

  const mode = theme.palette.mode;
  const isOutgoing = Boolean(data?.sender === userId);

  return (
    <Stack spacing={0.7}>
      <Box
        sx={{
          ...(mode === "dark"
            ? {
                backgroundColor: isDeleted
                  ? "error.darker"
                  : !isOutgoing
                  ? alpha(theme.palette.primary.light, 0.2)
                  : "grey.700",
              }
            : {
                backgroundColor: isDeleted
                  ? "error.lighter"
                  : !isOutgoing
                  ? alpha(theme.palette.primary.light, 0.2)
                  : "grey.800",
              }),
          borderRadius: 1.2,
          p: 1,
          px: 2,
          position: "relative",
        }}
      >
        {showMenu && !isDeleted && <Menu data={data} userId={userId} />}
        {isDeleted ? (
          <Typography
            variant="body2"
            sx={{
              ...(mode === "dark"
                ? {
                    color: !isOutgoing ? "grey.200" : "grey.200",
                  }
                : {
                    color: isDeleted
                      ? "grey.900"
                      : !isOutgoing
                      ? "grey.900"
                      : "grey.200",
                  }),
              fontWeight: "500",
            }}
          >
            This message is deleted
          </Typography>
        ) : (
          children
        )}
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
