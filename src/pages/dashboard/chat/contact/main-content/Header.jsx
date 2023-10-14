import { Stack, Typography, IconButton, useTheme } from "@mui/material";
import { XCircle } from "phosphor-react";
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
      <IconButton onClick={handleToggleSidebar}>
        <XCircle size={25} />
      </IconButton>
      <Typography
        variant="body1"
        fontWeight={mode === "light" ? "500" : "400"}
        sx={{
          color: mode === "light" ? "grey.700" : "grey.200",
        }}
      >
        Contact info
      </Typography>
    </HeaderContainer>
  );
};

export default Header;
