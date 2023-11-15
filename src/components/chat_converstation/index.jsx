import { Box, Stack } from "@mui/material";

import Header from "./header";
import Messages from "./msg";
import Footer from "./footer";

const Converstation = ({ isGroup }) => {
  return (
    <Stack direction="column" width="100%" height="100%">
      <Box backgroundColor="black">{!isGroup && <Header />}</Box>
      <Box display="flex" flexGrow={1}>
        <Messages />
      </Box>
      <Box>
        <Footer />
      </Box>
    </Stack>
  );
};

export default Converstation;