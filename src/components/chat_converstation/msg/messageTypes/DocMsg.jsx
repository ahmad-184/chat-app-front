import { Stack, Box, useTheme, Typography, IconButton } from "@mui/material";
import { Image, DownloadSimple } from "phosphor-react";

import ShowMsgTime from "./ShowMsgTime";
import Menu from "./Menu";

const DocMsg = ({ data, showMenu = true, showTime = true }) => {
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
          py: 1.5,
          px: 2,
          position: "relative",
        }}
      >
        {showMenu && <Menu data={data} />}
        <Stack direction="column" spacing={1}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            p={0.5}
            px={1}
            borderRadius={1}
            sx={{
              ...(mode === "dark"
                ? {
                    backgroundColor: isIncoming ? "grey.900" : "grey.200",
                  }
                : {
                    backgroundColor: isIncoming ? "grey.200" : "grey.200",
                  }),
            }}
          >
            <Box
              lineHeight="0"
              sx={{
                ...(mode === "dark"
                  ? {
                      color: isIncoming ? "grey.500" : "grey.700",
                    }
                  : {
                      color: isIncoming ? "grey.700" : "grey.700",
                    }),
              }}
            >
              <Image size={45} weight="light" />
            </Box>
            <Typography
              variant="body2"
              sx={{
                ...(mode === "dark"
                  ? {
                      color: isIncoming ? "grey.200" : "grey.800",
                    }
                  : {
                      color: isIncoming ? "grey.700" : "grey.700",
                    }),
                fontWeight: "500",
              }}
            >
              Abstract.png
            </Typography>
            <IconButton
              sx={{
                ...(mode === "dark"
                  ? {
                      color: isIncoming ? "grey.500" : "grey.700",
                    }
                  : {
                      color: isIncoming ? "grey.700" : "grey.700",
                    }),
              }}
            >
              <DownloadSimple size={29} />
            </IconButton>
          </Stack>
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
        </Stack>
        {showTime && <ShowMsgTime data={data} />}
      </Box>
    </Stack>
  );
};

export default DocMsg;
