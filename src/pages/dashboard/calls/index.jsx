import { Stack } from "@mui/material";

import Sidebar from "./sidebar";
import NoChatView from "../../../components/NoChatView";

const Call_Logs = () => {
  return (
    <Stack width="100%" direction="row">
      <Sidebar />
      <NoChatView />
    </Stack>
  );
};

export default Call_Logs;
