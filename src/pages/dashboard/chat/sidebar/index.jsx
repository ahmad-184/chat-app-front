import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  useTheme,
  Button,
  Divider,
} from "@mui/material";
import { CircleDashed, ArchiveBox, Users } from "phosphor-react";
import * as _ from "lodash";

import { SimpleBarStyle } from "../../../../components/Scrollbar";
import UserChatList from "./UserChatList";
import SearchInput from "../../../../components/SearchInput";
import SidebarContainer from "../../SidebarContainer";
import { ChatList } from "../../../../data";
import UsersDialog from "../../../../sections/dashboard/chat/users_dialog";

const Sidebar = () => {
  const theme = useTheme();

  const [openUsersDialog, setOpenUsersDialog] = useState(false);
  const closeUserDialog = () => setOpenUsersDialog(false);
  const handleOpenUserDialog = () => setOpenUsersDialog(true);

  const [filteredData, setFilteredData] = useState([]);
  const [value, setValue] = useState("");

  const handleSearch = _.debounce((event) => {
    const query = event.target.value;
    setValue(query);
    if (query === "" || query === null) return setFilteredData([]);
    setFilteredData(() => {
      return ChatList.filter(({ name }) =>
        name.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, 600);

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
          <Typography variant="h3">Chats</Typography>
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
        <Stack direction="row" spacing={1} alignItems="center">
          <ArchiveBox size={22} />
          <Button
            variant="text"
            color="info"
            sx={{
              color: theme.palette.info.main,
            }}
          >
            archived
          </Button>
        </Stack>
      </Stack>
      <Box mb={2} px={3}>
        <Divider variant="fullWidth" />
      </Box>
      <SimpleBarStyle
        timeout={500}
        clickOnTrack={false}
        style={{ display: "flex", flexGrow: 1, overflow: "auto" }}
      >
        <Stack direction="column" spacing={2} px={3} pb={2}>
          {filteredData.length || value.length ? (
            <Stack direction="column" spacing={2}>
              {filteredData.map((item) => (
                <UserChatList key={item.id} data={item} />
              ))}
            </Stack>
          ) : (
            <>
              <Stack direction="column" spacing={2}>
                <Typography variant="subtitle2" sx={{ color: "grey.500" }}>
                  Pinned
                </Typography>
                {/* {ChatList.filter((item) => item.pinned).map((item) => (
                  <UserChatList key={item.id} data={item} />
                ))} */}
              </Stack>
              <Stack direction="column" spacing={2}>
                <Typography variant="subtitle2" sx={{ color: "grey.500" }}>
                  All chats
                </Typography>
                {/* {ChatList.filter((item) => !item.pinned).map((item) => (
                  <UserChatList key={item.id} data={item} />
                ))} */}
              </Stack>
            </>
          )}
        </Stack>
      </SimpleBarStyle>
    </SidebarContainer>
  );
};

export default Sidebar;
