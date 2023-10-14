import { Stack } from "@mui/material";

import SettingsPanel from "./SettingsPanel";
import RightPanel from "./RightPanel";

const Settings = () => {
  return (
    <Stack width="100%" direction="row">
      <SettingsPanel />
      <RightPanel />
    </Stack>
  );
};
export default Settings;
