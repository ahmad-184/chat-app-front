import {
  Stack,
  IconButton,
  Box,
  Typography,
  useTheme,
  Divider,
} from "@mui/material";
import { Star, CaretRight } from "phosphor-react";
import { useDispatch } from "react-redux";

import { updateSidebarType } from "../../../../../app/slices/app";

const StarredMessages = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const dispatch = useDispatch();

  return (
    <Stack width="100%" px={3}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        pb={3}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            lineHeight={0}
            sx={{
              color: mode === "light" ? "grey.600" : "grey.500",
            }}
          >
            <Star weight="fill" size={20} />
          </Box>
          <Typography
            variant="body1"
            fontWeight={mode === "light" ? "500" : "400"}
            sx={{
              color: mode === "light" ? "grey.800" : "grey.300",
            }}
          >
            Starred messages
          </Typography>
        </Stack>
        <IconButton
          sx={{
            color: mode === "light" ? "grey.700" : "grey.200",
          }}
          onClick={() => dispatch(updateSidebarType({ type: "STARRED" }))}
        >
          <CaretRight />
        </IconButton>
      </Stack>
      <Divider variant="fullWidth" />
    </Stack>
  );
};

export default StarredMessages;
