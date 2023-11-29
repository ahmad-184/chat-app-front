import { memo, forwardRef } from "react";
import { Stack, Box, useTheme, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Check, Checks } from "phosphor-react";

import ShowMsgTime from "./ShowMsgTime";
import Menu from "./Menu";

import MessagesHOC from "../../../../HOC's/MessagesHOC";

const TextMsg = forwardRef(
  ({ data, showMenu = true, showTime = true }, ref) => {
    const theme = useTheme();
    const { userId } = useSelector((state) => state.auth);

    const mode = theme.palette.mode;
    const isOutgoing = Boolean(data?.sender === userId);

    return (
      <Stack
        direction="row"
        id={data?._id}
        justifyContent={!isOutgoing ? "start" : "end"}
        ref={ref}
      >
        <Stack spacing={0.7}>
          <Box
            sx={{
              ...(mode === "dark"
                ? {
                    backgroundColor: !isOutgoing ? "grey.800" : "primary.main",
                  }
                : {
                    backgroundColor: !isOutgoing ? "grey.800" : "primary.main",
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
                      color: !isOutgoing ? "grey.200" : "grey.200",
                    }),
                fontWeight: "500",
              }}
            >
              {data?.text}
            </Typography>
          </Box>
          <Stack
            direction="row"
            justifyContent={isOutgoing && "end"}
            width="100%"
          >
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
      </Stack>
    );
  }
);

export default memo(MessagesHOC(TextMsg));
