import { Stack, Box, useTheme, IconButton, alpha } from "@mui/material";
import { ArrowLeft } from "phosphor-react";

import User from "./User";
import Buttons from "./Buttons";

const Header = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  return (
    <Box
      backgroundColor={mode === "light" ? "#F8FAFF" : "grey.800"}
      width="100%"
      px={{
        xs: 1,
        md: 4,
      }}
      display="flex"
      alignItems="center"
      height={80}
      sx={{
        ...(mode === "light" && {
          borderBottom: "1px solid",
          borderColor: alpha(theme.palette.grey[300], 0.5),
        }),
      }}
    >
      <Stack direction="row" alignItems="center" width="100%">
        <IconButton
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
          }}
        >
          <ArrowLeft />
        </IconButton>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
          alignItems="center"
        >
          <User />
          <Buttons />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
