import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "./navbar";
import { getIsLoggedIn } from "../../app/slices/auth";

const DashboardLayout = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/login");
    }
  }, [isLoggedIn]);

  return (
    <Stack direction="row">
      <Navbar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
