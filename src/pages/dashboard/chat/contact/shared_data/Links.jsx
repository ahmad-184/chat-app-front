import {
  Box,
  Stack,
  Typography,
  useTheme,
  Link as MUILink,
} from "@mui/material";
import { LinkSimple } from "@phosphor-icons/react";

import { SHARED_links } from "../../../../../data";

const Link = ({ data }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Stack
      direction="row"
      spacing={1}
      p={1}
      sx={{
        borderRadius: 1,
        backgroundColor: mode === "light" ? "grey.300" : "grey.800",
        boxShadow: theme.shadows[3],
      }}
      // alignItems="center"
      minWidth={0}
    >
      <Box width="70px" height="70px" overflow="hidden" borderRadius={1}>
        {data.preview ? (
          <img
            src={data.preview}
            alt={data.message}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Box
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor={mode === "light" ? "grey.100" : "grey.700"}
          >
            <LinkSimple size={31} />
          </Box>
        )}
      </Box>
      <Stack
        direction="column"
        spacing={0.5}
        minWidth={0}
        width="calc(100% - 70px)"
      >
        <Typography
          variant="body2"
          fontWeight={mode === "light" ? "600" : "400"}
          noWrap
          component={MUILink}
          sx={{
            color: mode === "light" ? "grey.700" : "grey.300",
            pt: "4px",
          }}
        >
          https://youtube.com/
        </Typography>
        <Typography
          variant="body2"
          fontWeight={mode === "light" ? "500" : "400"}
          noWrap
          component={MUILink}
          sx={{
            color: mode === "light" ? "info.main" : "info.light",
          }}
        >
          www.youtube.com
        </Typography>
      </Stack>
    </Stack>
  );
};

const Links = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Stack direction="column" spacing={3}>
      <Box>
        <Typography
          variant="body2"
          fontWeight={mode === "light" ? 600 : 400}
          sx={{
            color: mode === "light" ? "grey.600" : "grey.300",
            fontSize: 13,
          }}
        >
          27th Oct 22
        </Typography>
        <Stack direction="column" spacing={1.5} mt={2}>
          {SHARED_links.map((item, index) => (
            <Box width="100%" key={index}>
              <Link data={item} />
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default Links;
