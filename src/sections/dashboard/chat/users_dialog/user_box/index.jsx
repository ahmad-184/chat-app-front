import { useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  updateUsersThunk,
  getUsers,
  getAppLoading,
} from "../../../../../app/slices/app";
import { getToken } from "../../../../../app/slices/auth";

import User from "./User";
import Loader from "../Loader";

const UserBox = () => {
  const users = useSelector(getUsers);
  const isLoading = useSelector(getAppLoading);
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUsersThunk({ token }));
  }, []);

  if (!users.length && isLoading) return <Loader />;

  return (
    <Stack px={1} py={1} spacing={1.5} width="100%">
      {users.length ? (
        users.map((item, index) => <User item={item} key={index} />)
      ) : (
        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            color: "grey.500",
          }}
        >
          ...Therer is no user...
        </Typography>
      )}
    </Stack>
  );
};

export default UserBox;
