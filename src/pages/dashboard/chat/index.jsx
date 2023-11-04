import { Stack } from "@mui/material";

import Sidebar from "./sidebar";
import ChatView from "./chatview";
import Contact from "./contact";

const Chats = () => {
  return (
    <Stack width="100%" direction="row">
      <Sidebar />
      <ChatView />
      <Contact />
    </Stack>
  );
};

export default Chats;
