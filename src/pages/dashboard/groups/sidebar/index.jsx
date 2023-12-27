import { useState } from "react";
import {
  Typography,
  Stack,
  IconButton,
  Button,
  Divider,
  Box,
} from "@mui/material";
import { Plus } from "@phosphor-icons/react";
import * as _ from "lodash";

import { SimpleBarStyle } from "../../../../components/Scrollbar";
import GroupsList from "./GroupsList";
import SidebarContainer from "../../SidebarContainer";
import SearchInput from "../../../../components/SearchInput";
import { ChatList } from "../../../../data";
import CreateNewGroupDialog from "./CreateNewGroupDialog";

const Sidebar = () => {
  const [openDilog, setOpenDilog] = useState(false);
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
      <Stack direction="column" spacing={3.5} p={3} pb={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" fontSize={"26px !important"}>
            Groups
          </Typography>
        </Stack>
        <SearchInput onChange={handleSearch} />
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            onClick={() => setOpenDilog(true)}
            variant="text"
            color="info"
          >
            Create New Group
          </Button>
          <IconButton onClick={() => setOpenDilog(true)} color="info">
            <Plus size={22} />
          </IconButton>
        </Stack>
      </Stack>
      <Box px={3} mb={2}>
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
                <GroupsList key={item.id} data={item} />
              ))}
            </Stack>
          ) : (
            <>
              <Stack direction="column" spacing={2}>
                <Typography variant="subtitle2" sx={{ color: "grey.500" }}>
                  Pinned
                </Typography>
                {ChatList.filter((item) => item.pinned).map((item) => (
                  <GroupsList key={item.id} data={item} />
                ))}
              </Stack>
              <Stack direction="column" spacing={2}>
                <Typography variant="subtitle2" sx={{ color: "grey.500" }}>
                  All groups
                </Typography>
                {ChatList.filter((item) => !item.pinned).map((item) => (
                  <GroupsList key={item.id} data={item} />
                ))}
              </Stack>
            </>
          )}
        </Stack>
      </SimpleBarStyle>
      {openDilog ? (
        <CreateNewGroupDialog
          open={openDilog}
          handleClose={() => setOpenDilog(false)}
        />
      ) : null}
    </SidebarContainer>
  );
};

export default Sidebar;
