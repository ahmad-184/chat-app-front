import { useState } from "react";
import { Stack, Tabs, Tab } from "@mui/material";

import { SimpleBarStyle } from "../../../../../components/Scrollbar";

import Header from "./Header";
import Medias from "./Medias";
import Links from "./Links";
import Docs from "./Docs";
import Container from "../Container";

const SharedData = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container>
      <Header />
      <SimpleBarStyle style={{ width: "100%", height: "calc(100% - 80px)" }}>
        <Stack direction="column" spacing={3} width="100%" py={3} px={3}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            centered
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "space-between",
              },
            }}
          >
            <Tab label="Media" />
            <Tab label="Link" />
            <Tab label="Docs" />
          </Tabs>
          {(() => {
            switch (activeTab) {
              case 0:
                return <Medias />;
              case 1:
                return <Links />;
              case 2:
                return <Docs />;
              default:
                return null;
            }
          })()}
        </Stack>
      </SimpleBarStyle>
    </Container>
  );
};

export default SharedData;
