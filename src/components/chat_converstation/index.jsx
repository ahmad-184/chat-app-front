import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";

import Header from "./header";
import Messages from "./msg";
import Footer from "./footer";

import { getAllMessages } from "../../app/slices/chat_conversation";

const Converstation = ({ isGroup }) => {
  const msgs = useSelector(getAllMessages);

  return (
    <Stack direction="column" width="100%" height="100vh">
      <Box backgroundColor="black">{!isGroup && <Header />}</Box>
      <Box display="flex" flexGrow={1} sx={{ overflow: "hidden" }}>
        {/* {Object.keys(msgs) && <Messages />} */}
        <Messages />
      </Box>
      <Box>
        <Footer />
      </Box>
    </Stack>
  );
};

export default Converstation;
