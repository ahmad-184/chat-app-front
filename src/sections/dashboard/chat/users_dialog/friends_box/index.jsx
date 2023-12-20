import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  updateFriendsThunk,
  getFriends,
  selectConversation,
  getAppLoading,
} from "../../../../../app/slices/app";
import { getToken, getUserId } from "../../../../../app/slices/auth";
import {
  startNewConversation,
  addConversation,
  getConversations,
  startConversation,
} from "../../../../../app/slices/conversation";
import useSocket from "../../../../../hooks/useSocket";
import Loader from "../Loader";
import FriendBox from "./FriendBox";
import { resetMessagePage } from "../../../../../app/slices/message";

const Friend = ({ handleClose }) => {
  const friends = useSelector(getFriends);
  const appLoading = useSelector(getAppLoading);
  const token = useSelector(getToken);
  const userId = useSelector(getUserId);
  const conversations = useSelector(getConversations);
  const dispatch = useDispatch();

  const { socket } = useSocket();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(updateFriendsThunk({ token }));
  }, []);

  const handleStartConversation = async (friendId) => {
    try {
      for (const conv of conversations) {
        if (conv?.friend_id === friendId) {
          dispatch(
            selectConversation({
              chat_type: "dividual",
              room_id: conv?._id,
            })
          );
          dispatch(startConversation(conv?._id));
          dispatch(resetMessagePage());
          handleClose(false);
          return;
        }
      }
      socket.emit(
        "start_conversation",
        { friend_id: friendId, user_id: userId },
        ({ conversation }) => {
          dispatch(addConversation(conversation));
          dispatch(startNewConversation({ conversation }));
          setIsLoading(false);
          handleClose(false);
          dispatch(
            selectConversation({
              chat_type: "dividual",
              room_id: conversation._id,
            })
          );
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (appLoading) return <Loader />;

  return (
    <Stack px={1} py={1} spacing={1.5} width="100%">
      {friends?.length ? (
        friends?.map((item, index) => (
          <FriendBox
            item={item}
            key={index}
            isLoading={isLoading}
            handleStartConversation={handleStartConversation}
            setIsLoading={setIsLoading}
          />
        ))
      ) : (
        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            color: "grey.500",
          }}
        >
          ...You have no friends, you are alone...
        </Typography>
      )}
    </Stack>
  );
};

export default Friend;
