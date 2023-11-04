import { Stack } from "@mui/material";

import Sidebar from "./sidebar";
import ChatView from "./chatview";

const Groups = () => {
  return (
    <Stack width="100%" direction="row">
      <Sidebar />
      <ChatView />
    </Stack>
  );
};

export default Groups;
