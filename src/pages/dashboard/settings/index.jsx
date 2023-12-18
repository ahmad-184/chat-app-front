import { Stack } from "@mui/material";

import SettingsPanel from "./SettingsPanel";
import NoChatView from "../../../components/NoChatView";

const Settings = () => {
  return (
    <Stack width="100%" direction="row">
      <SettingsPanel />
      <NoChatView />
    </Stack>
  );
};
export default Settings;
