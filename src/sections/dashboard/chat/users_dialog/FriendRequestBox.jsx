import { useEffect } from "react";
import { Stack, Box, Typography, Avatar, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  updateFriendRequestsThunk,
  getFriendRequests,
} from "../../../../app/slices/app";
import { getToken } from "../../../../app/slices/auth";

const FriendsBox = () => {
  const friendRequests = useSelector(getFriendRequests);
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateFriendRequestsThunk({ token }));
  }, []);

  return <div>FriendsBox</div>;
};

export default FriendsBox;
