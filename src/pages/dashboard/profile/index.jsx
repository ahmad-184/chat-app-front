import { Stack } from "@mui/material";

import ProfilePanel from "./ProfilePanel";
import RightPanel from "./RightPanel";

const Settings = () => {
  return (
    <Stack width="100%" direction="row">
      <ProfilePanel />
      <RightPanel />
    </Stack>
  );
};
export default Settings;
