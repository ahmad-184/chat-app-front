import { useState } from "react";
import { Stack, Typography, useTheme, Box, Divider } from "@mui/material";
import { BellRinging } from "@phosphor-icons/react";

import AntSwitch from "../../../../../components/AntSwitch";

const NotificationSetting = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const [value, setValue] = useState(false);

  return (
    <Stack width="100%" px={3}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        pb={3}
        onClick={() => setValue((prev) => !prev)}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            lineHeight={0}
            sx={{
              color: mode === "light" ? "grey.600" : "grey.500",
            }}
          >
            <BellRinging size={23} />
          </Box>
          <Typography
            variant="body1"
            fontWeight={mode === "light" ? "500" : "400"}
            sx={{
              color: mode === "light" ? "grey.800" : "grey.300",
              userSelect: "none",
            }}
          >
            Mute Notifications
          </Typography>
        </Stack>
        <AntSwitch
          checked={value}
          onChange={(event) => {
            setValue(event.target.checked);
          }}
        />
      </Stack>
      <Divider variant="fullWidth" />
    </Stack>
  );
};

export default NotificationSetting;
