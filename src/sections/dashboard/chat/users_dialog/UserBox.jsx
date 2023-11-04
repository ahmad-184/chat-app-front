import { useEffect } from "react";
import { Stack, Box, Typography, Avatar, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { updateUsersThunk, getUsers } from "../../../../app/slices/app";
import { getToken } from "../../../../app/slices/auth";

const UserBox = () => {
  const users = useSelector(getUsers);
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUsersThunk({ token }));
  }, []);

  return <div>UserBox</div>;
};

export default UserBox;
