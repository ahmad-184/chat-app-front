import { Stack, Typography, IconButton, useTheme } from "@mui/material";
import { CaretLeft } from "phosphor-react";

import { SimpleBarStyle } from "../../../components/Scrollbar";
import SidebarContainer from "../SidebarContainer";

import ProfileSetting from "../../../sections/dashboard/settings/ProfileSetting";

const ProfilePanel = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <>
      <SidebarContainer>
        <SimpleBarStyle style={{ width: "100%", height: "100%" }}>
          <Stack direction="column" spacing={4} p={3} pb={2} width="100%">
            <Stack direction="row" spacing={3} width="100%" alignItems="center">
              <IconButton
                sx={{ color: mode === "light" && "grey.700" }}
                onClick={() => {
                  window.history.back();
                }}
              >
                <CaretLeft size={27} weight="regular" />
              </IconButton>
              <Typography variant="h4" fontSize={"26px !important"}>
                Profile
              </Typography>
            </Stack>
            <ProfileSetting />
          </Stack>
        </SimpleBarStyle>
      </SidebarContainer>
    </>
  );
};

export default ProfilePanel;
