import { SnackbarProvider, closeSnackbar } from "notistack";
import { styled } from "@mui/material/styles";
import { MaterialDesignContent } from "notistack";
import { X } from "phosphor-react";

import useSettings from "../hooks/useSettings";

import { FONT_PRIMARY } from "../theme/typography";
import { Box, IconButton } from "@mui/material";

const overideSnakbarStyles = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#229A16",
  },
  "&.notistack-MuiContent-error": {
    // backgroundColor: "#FF4842",
  },
  "&.notistack-MuiContent-info": {
    backgroundColor: "#1890FF",
  },
  "&.notistack-MuiContent-warning": {
    backgroundColor: "#FFC107",
  },
}));

export default function ToasterProvider() {
  const { themeDirection } = useSettings();

  return (
    <SnackbarProvider
      autoHideDuration={3000}
      style={{
        fontFamily: FONT_PRIMARY,
        direction: themeDirection,
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      Components={{
        success: overideSnakbarStyles,
        error: overideSnakbarStyles,
        default: overideSnakbarStyles,
        info: overideSnakbarStyles,
        warning: overideSnakbarStyles,
      }}
      action={(snackbarId) => (
        <Box>
          <IconButton
            sx={{ color: "grey.200" }}
            onClick={() => closeSnackbar(snackbarId)}
          >
            <X weight="bold" size={19} />
          </IconButton>
        </Box>
      )}
    />
  );
}
