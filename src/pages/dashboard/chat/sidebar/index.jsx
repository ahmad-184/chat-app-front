import { useState, useEffect } from "react";
import { Typography, Stack, IconButton } from "@mui/material";
import { CircleDashed, Users } from "phosphor-react";
import * as _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { SimpleBarStyle } from "../../../../components/Scrollbar";
import UserChatList from "./UserChatList";
import OnlineUsers from "./OnlineUsers";
import SearchInput from "../../../../components/SearchInput";
import SidebarContainer from "../../SidebarContainer";
import UsersDialog from "../../../../sections/dashboard/chat/users_dialog";

import {
  getChatConversations,
  fetchConversationsThunk,
} from "../../../../app/slices/chat_conversation";
import { getToken } from "../../../../app/slices/auth";

const Sidebar = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);

  const [openUsersDialog, setOpenUsersDialog] = useState(false);
  const closeUserDialog = () => setOpenUsersDialog(false);
  const handleOpenUserDialog = () => setOpenUsersDialog(true);

  const chats = useSelector(getChatConversations);

  const [filteredData, setFilteredData] = useState([]);
  const [value, setValue] = useState("");

  const handleSearch = _.debounce((event) => {
    const query = event.target.value;
    setValue(query);
    if (query === "" || query === null) return setFilteredData([]);
    setFilteredData(() => {
      return chats.filter(({ name }) =>
        name.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, 600);

  useEffect(() => {
    const getUserChatConversations = async () => {
      await dispatch(fetchConversationsThunk({ token }));
    };
    getUserChatConversations();
  }, []);

  return (
    <SidebarContainer>
      {openUsersDialog && (
        <UsersDialog open={openUsersDialog} handleClose={closeUserDialog} />
      )}
      <Stack direction="column" spacing={3.5} p={3} pb={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" fontSize={"26px !important"}>
            Chats
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton onClick={handleOpenUserDialog}>
              <Users />
            </IconButton>
            <IconButton>
              <CircleDashed />
            </IconButton>
          </Stack>
        </Stack>
        <SearchInput onChange={handleSearch} />
      </Stack>
      <Stack
        mt={0.5}
        mb={2.5}
        width="100%"
        sx={{
          overflowX: "hidden",
        }}
      >
        <OnlineUsers />
      </Stack>
      <SimpleBarStyle
        timeout={500}
        clickOnTrack={false}
        style={{ display: "flex", flexGrow: 1, overflow: "auto" }}
      >
        {chats.length !== 0 && (
          <Stack direction="column" spacing={2} px={3} pb={2} pt={0}>
            {filteredData.length || value.length ? (
              <Stack direction="column" spacing={2}>
                {filteredData.map((item, index) => (
                  <UserChatList
                    key={`${item._id}_${Math.floor(
                      Math.random * 10500
                    )}_${index}`}
                    data={item}
                  />
                ))}
              </Stack>
            ) : (
              <>
                <Stack direction="column" spacing={2}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "inherit",
                      fontWeight: "700",
                      "&.MuiTypography-root": {
                        marginLeft: "-7px",
                      },
                    }}
                  >
                    Recent
                  </Typography>
                  <Stack spacing={1.5}>
                    {chats
                      .filter((item) => !item.pinned)
                      .map((item, index) => (
                        <UserChatList
                          key={`${item._id}_${Math.floor(
                            Math.random * 10500
                          )}_${index}`}
                          data={item}
                        />
                      ))}
                  </Stack>
                </Stack>
              </>
            )}
          </Stack>
        )}
      </SimpleBarStyle>
    </SidebarContainer>
  );
};

export default Sidebar;
