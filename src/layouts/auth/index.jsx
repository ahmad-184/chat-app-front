import { Outlet } from "react-router-dom";
import { Container, Stack } from "@mui/material";

import Logo from "../../assets/Images/logo.ico";

const AuthLayout = () => {
  return (
    <Container maxWidth="sm">
      <Stack pt={7} width="100%">
        <Stack direction="row" pb={3} justifyContent="center" width="100%">
          <img style={{ width: 120 }} src={Logo} alt="logo icon" />
        </Stack>
        <Outlet />
      </Stack>
    </Container>
  );
};

export default AuthLayout;
