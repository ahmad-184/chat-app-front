import { useState } from "react";
import { Stack } from "@mui/material";

import Header from "./Header";
import User from "./User";
import About from "./About";
import SharedData from "./SharedData";
import StarredMessages from "./StarredMessages";
import NotificationSetting from "./NotificationSetting";
import Common from "./Common";
import BlockDiagram from "./BlockDiagram";
import DeleteDiagram from "./DeleteDiagram";

import { SimpleBarStyle } from "../../../../../components/Scrollbar";
import Container from "../Container";

const Contact = () => {
  const [openBockDiagram, setOpenBlockDiagram] = useState(false);
  const [openDeleteDiagram, setOpenDeleteDiagram] = useState(false);

  const handleOpenBlockDiagram = () => setOpenBlockDiagram(true);
  const handleOpenDeleteDiagram = () => setOpenDeleteDiagram(true);

  const handleCloseBlockDiagram = () => setOpenBlockDiagram(false);
  const handleCloseDeleteDiagram = () => setOpenDeleteDiagram(false);

  return (
    <Container>
      <Header />
      <SimpleBarStyle style={{ width: "100%", height: "calc(100% - 80px)" }}>
        <Stack direction="column" spacing={3} width="100%" py={3}>
          <User />
          <About />
          <SharedData />
          <StarredMessages />
          <NotificationSetting />
          <Common
            handleOpenBlockDiagram={handleOpenBlockDiagram}
            handleOpenDeleteDiagram={handleOpenDeleteDiagram}
          />
        </Stack>
      </SimpleBarStyle>
      {openBockDiagram && (
        <BlockDiagram
          open={openBockDiagram}
          handleClose={handleCloseBlockDiagram}
        />
      )}
      {openDeleteDiagram && (
        <DeleteDiagram
          open={openDeleteDiagram}
          handleClose={handleCloseDeleteDiagram}
        />
      )}
    </Container>
  );
};

export default Contact;
