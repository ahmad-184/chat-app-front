import { useState } from "react";
import { Box, Menu as MUIMenu, MenuItem, Stack } from "@mui/material";
import { DotsThreeVertical } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { Message_options } from "../../../../data";
import {
  deleteMessageThunk,
  deleteMessage,
  addReplay,
} from "../../../../app/slices/message";
import useSocket from "../../../../hooks/useSocket";
import { deleteConversationsLastMessage } from "../../../../app/slices/conversation";

const Menu = ({ data, userId }) => {
  const isOutgoing = Boolean(data?.sender === userId);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const { socket } = useSocket();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const handleDeleteMessage = async () => {
    try {
      setLoading(true);
      await dispatch(
        deleteMessageThunk({
          token,
          id: data?._id,
        })
      ).then((res) => {
        if (res.payload.status === 200) {
          dispatch(deleteMessage(res.payload.data.message_id));
          dispatch(deleteConversationsLastMessage(res.payload.data.message_id));
          socket.emit("delete_message", {
            message_id: res.payload.data.message_id,
            user_id: isOutgoing ? data?.receiver : data?.sender,
          });
        }
      });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectReplay = () => {
    dispatch(addReplay(data));
  };

  return (
    <Box>
      <Box
        position="absolute"
        sx={{
          ...(isOutgoing && {
            top: 0,
            right: -23,
          }),
          ...(!isOutgoing && {
            top: 0,
            left: -23,
          }),
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <DotsThreeVertical weight="bold" size={22} />
      </Box>
      <MUIMenu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: !isOutgoing ? "left" : "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: isOutgoing ? "right" : "left",
        }}
      >
        <Stack direction="column" spacing={1}>
          {Message_options.map((item) => {
            if (!isOutgoing && item.id === 1) return;
            if (!isOutgoing && item.id === 5) return;
            return (
              <MenuItem
                onClick={() => {
                  handleClose();
                  switch (item.id) {
                    case 0: {
                      return handleSelectReplay();
                    }
                    case 5: {
                      return handleDeleteMessage();
                    }
                  }
                }}
                key={item.id}
              >
                {item?.title}
              </MenuItem>
            );
          })}
        </Stack>
      </MUIMenu>
    </Box>
  );
};
export default Menu;
