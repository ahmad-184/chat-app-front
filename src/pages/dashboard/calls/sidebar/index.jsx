import { useState } from "react";
import {
  Typography,
  Stack,
  IconButton,
  Button,
  Divider,
  Box,
} from "@mui/material";
import { Phone } from "phosphor-react";
import * as _ from "lodash";

import { SimpleBarStyle } from "../../../../components/Scrollbar";
import SidebarContainer from "../../SidebarContainer";
import SearchInput from "../../../../components/SearchInput";
import { CallLogElement } from "./elements";
import NewConverstationDialog from "./NewConverstationDialog";
import { calls_data } from "../../../../data";

const Sidebar = () => {
  const [openDilog, setOpenDilog] = useState(false);
  const [filteredData, setFilteredData] = useState([...calls_data]);

  const handleSearch = _.debounce((event) => {
    const query = event.target.value;
    if (query === "" || query === null) return setFilteredData([...calls_data]);
    setFilteredData(() => {
      return calls_data.filter(({ name }) =>
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
          <Typography variant="h3">Call Log</Typography>
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
            Start new converstation
          </Button>
          <IconButton onClick={() => setOpenDilog(true)} color="info">
            <Phone size={22} />
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
          <Stack direction="column" spacing={2}>
            {filteredData.map((data, index) => (
              <CallLogElement key={index} data={data} />
            ))}
          </Stack>
        </Stack>
      </SimpleBarStyle>
      {openDilog ? (
        <NewConverstationDialog
          open={openDilog}
          handleClose={() => setOpenDilog(false)}
        />
      ) : null}
    </SidebarContainer>
  );
};

export default Sidebar;
