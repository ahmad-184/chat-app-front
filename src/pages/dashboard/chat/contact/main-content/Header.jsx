import { Stack, Typography, IconButton, useTheme } from "@mui/material";
import { X } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";

import { toggleSidebar } from "../../../../../app/slices/app";
import HeaderContainer from "../HeaderContainer";

const Header = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const dispatch = useDispatch();

  const handleToggleSidebar = () => dispatch(toggleSidebar());

  return (
    <HeaderContainer>
      <Stack
        height="100%"
        direction="row"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
      >
        <Typography
          variant="h6"
          fontWeight={mode === "light" ? "500" : "400"}
          sx={{
            color: mode === "light" ? "grey.700" : "grey.200",
          }}
        >
          Contact info
        </Typography>
        <IconButton onClick={handleToggleSidebar}>
          <X size={23} weight="bold" />
        </IconButton>
      </Stack>
    </HeaderContainer>
  );
};

export default Header;
