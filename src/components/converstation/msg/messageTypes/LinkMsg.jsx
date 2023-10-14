import {
  Stack,
  Box,
  useTheme,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { Image, DownloadSimple } from "phosphor-react";

import ShowMsgTime from "./ShowMsgTime";
import Menu from "./Menu";

const LinkMsg = ({ data, showMenu = true, showTime = true }) => {
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
        <Box width="100%" pb={1}>
          <img
            style={{
              maxHeight: "210px",
              height: "100%",
              maxWidth: "100%",
              borderRadius: 10,
              objectFit: "cover",
            }}
            src={data.preview}
            alt={data.message}
          />
        </Box>
        <Stack spacing={0.5}>
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
            creating chat app
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              ...(mode === "dark"
                ? {
                    color: isOutgoing && "info.light",
                  }
                : {
                    color: isOutgoing && "info.light",
                  }),
              fontWeight: "500",
            }}
            component={Link}
            to="//https://youtube.com/"
          >
            www.youtube.com
          </Typography>
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

export default LinkMsg;
