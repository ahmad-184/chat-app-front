import { Stack, Typography, IconButton, useTheme } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import { useDispatch } from "react-redux";

import { updateSidebarType } from "../../../../../app/slices/app";

import HeaderContainer from "../HeaderContainer";

const Header = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const dispatch = useDispatch();

  const handleBackToggle = () =>
    dispatch(updateSidebarType({ type: "CONTACT" }));

  return (
    <HeaderContainer>
      <IconButton onClick={handleBackToggle}>
        <CaretLeft size={25} />
      </IconButton>
      <Typography
        variant="body1"
        fontWeight={mode === "light" ? "500" : "400"}
        sx={{
          color: mode === "light" ? "grey.700" : "grey.200",
        }}
      >
        Shared messages
      </Typography>
    </HeaderContainer>
  );
};

export default Header;
