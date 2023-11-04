import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import Navbar from "./navbar";
import { getIsLoggedIn } from "../../app/slices/auth";

import { socket, socketConnect } from "../../socket";

const DashboardLayout = () => {
  const { isLoggedIn, token, userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      window.addEventListener("load", () => {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      });

      if (!socket) {
        socketConnect(userId, token);
      }

      socket.on("new_friend_request", async (data) => {
        enqueueSnackbar(data.message, { variant: "info" });
      });

      socket.on("friend_request_sent", async (data) => {
        enqueueSnackbar(data.message, { variant: "info" });
      });

      socket.on("accepted_friend_request", async (data) => {
        enqueueSnackbar(data.message, { variant: "success" });
      });
    }
    return () => {
      socket.off("new_friend_request");
      socket.off("friend_request_sent");
      socket.off("accepted_friend_request");
    };
  }, [socket, isLoggedIn]);

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
