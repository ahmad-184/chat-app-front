import { useState } from "react";
import { Dialog, Stack, Tabs, Tab, DialogContent } from "@mui/material";

import UserBox from "./UserBox";
import FriendBox from "./FriendBox";
import FriendRequestBox from "./FriendRequestBox";

const tabsData = ["Explore", "Friends", "Friend Requests"];

const UsersDialog = ({ open, handleClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  console.log(activeTab);

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
            // sx={{
            //   "& .MuiTabs-flexContainer": {
            //     justifyContent: "space-between",
            //   },
            // }}
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
          {(() => {
            switch (activeTab) {
              case 0:
                return <UserBox />;
              case 1:
                return <FriendBox />;
              case 2:
                return <FriendRequestBox />;
            }
          })()}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default UsersDialog;
