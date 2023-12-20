import { useState } from "react";
import { Dialog, Stack, Tabs, Tab, DialogContent, Box } from "@mui/material";

import UserBox from "./user_box";
import FriendBox from "./friends_box";
import RequestsBox from "./requests_box";

const tabsData = ["Explore", "Friends", "Requests"];

const UsersDialog = ({ open, handleClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogContent sx={{ pb: 2.5 }}>
        <Stack spacing={2} alignItems="center">
          <Tabs
            value={activeTab}
            centered
            onChange={(e, newValue) => setActiveTab(newValue)}
          >
            {tabsData.map((item, index) => (
              <Tab
                key={index}
                label={item}
                sx={{
                  p: "12px 16px",
                }}
              />
            ))}
          </Tabs>
          <Box width="100%" height={"fit-content"}>
            {(() => {
              switch (activeTab) {
                case 0:
                  return <UserBox />;
                case 1:
                  return <FriendBox handleClose={handleClose} />;
                case 2:
                  return <RequestsBox />;
              }
            })()}
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default UsersDialog;
