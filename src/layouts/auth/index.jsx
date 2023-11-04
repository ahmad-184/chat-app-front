import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LangMenu from "./LangMenu";

import Logo from "../../assets/Images/logo.ico";
import { getIsLoggedIn } from "../../app/slices/auth";

const AuthLayout = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <Suspense>
      <Container maxWidth="sm" position="relative">
        <LangMenu />
        <Stack pt={7} width="100%">
          <Stack direction="row" pb={3} justifyContent="center" width="100%">
            <img style={{ width: 120 }} src={Logo} alt="logo icon" />
          </Stack>
          <Outlet />
        </Stack>
      </Container>
    </Suspense>
  );
};

export default AuthLayout;
