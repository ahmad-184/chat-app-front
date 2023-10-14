import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";

import Navbar from "./navbar";

const DashboardLayout = () => {
  return (
    <Stack direction="row">
      <Navbar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
