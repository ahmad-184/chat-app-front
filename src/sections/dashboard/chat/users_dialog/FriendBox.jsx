import { useEffect } from "react";
import { Stack, Box, Typography, Avatar, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { updateFriendsThunk, getFriends } from "../../../../app/slices/app";
import { getToken } from "../../../../app/slices/auth";

const FriendBox = () => {
  const friends = useSelector(getFriends);
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateFriendsThunk({ token }));
  }, []);

  return <div>FriendBox</div>;
};

export default FriendBox;
