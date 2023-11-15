// ----------------------------------------------------------------------
import { alpha } from "@mui/material";

export default function Badge(theme) {
  return {
    MuiBadge: {
      styleOverrides: {
        dot: {
          width: 10,
          height: 10,
          borderRadius: "50%",
        },
        colorPrimary: {
          backgroundColor: alpha(theme.palette.primary.main, 0.4),
          color:
            theme.palette.mode === "light"
              ? theme.palette.primary.darker
              : theme.palette.primary.lighter,
        },
        colorInfo: {
          backgroundColor: alpha(theme.palette.primary.main, 0.4),
          color:
            theme.palette.mode === "light"
              ? theme.palette.info.darker
              : theme.palette.info.lighter,
        },
        colorError: {
          backgroundColor: alpha(theme.palette.error.main, 0.4),
          color:
            theme.palette.mode === "light"
              ? theme.palette.error.darker
              : theme.palette.error.lighter,
        },
      },
    },
  };
}
