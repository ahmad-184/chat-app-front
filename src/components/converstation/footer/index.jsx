import { Button, Stack, Box, useTheme, alpha } from "@mui/material";
import { TelegramLogo } from "phosphor-react";

import Input from "./Input";

const Footer = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Box
      p={2}
      width="100%"
      backgroundColor={mode === "light" ? "#F8FAFF" : "grey.800"}
      borderTop="1px solid"
      borderColor={
        mode === "light" ? alpha(theme.palette.grey[300], 0.5) : "grey.800"
      }
    >
      <Stack direction="row" spacing={2} alignItems="stretch" width="100%">
        <Input />
        <Button
          color="primary"
          sx={{
            width: "3rem",
            minWidth: "0px",
            p: 0,
            borderRadius: 1.55,
            boxShadow: "none",
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.7),
            },
          }}
          variant="contained"
        >
          <TelegramLogo size={26} weight="light" />
        </Button>
      </Stack>
    </Box>
  );
};

export default Footer;
