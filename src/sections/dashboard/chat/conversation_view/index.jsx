import { Box, Stack } from "@mui/material";

import {
  Footer,
  Header,
  MessageBox,
} from "../../../../components/chat_converstation";

const Converstation = ({ isGroup }) => {
  return (
    <Stack direction="column" width="100%" height="100vh">
      <Header />
      <Box display="flex" flexGrow={1} sx={{ overflow: "hidden" }}>
        {/* {Object.keys(msgs) && <Messages />} */}
        <MessageBox />
      </Box>
      <Box>
        <Footer />
      </Box>
    </Stack>
  );
};

export default Converstation;
