import { Stack } from "@mui/material";

import Profile from "./Profile";
import NoChatView from "../../../components/NoChatView";

const Settings = () => {
  return (
    <Stack width="100%" direction="row">
      <Profile />
      <NoChatView />
    </Stack>
  );
};
export default Settings;
