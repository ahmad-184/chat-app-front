import { Box, Stack } from "@mui/material";

import {
  Footer,
  Header,
  MessageBox,
} from "../../../../components/chat_converstation";

const Converstation = () => {
  return (
    <Stack direction="column" width="100%" height="100vh">
      <Header />
      <Box
        display="flex"
        position={"relative"}
        flexGrow={1}
        sx={{ overflow: "hidden" }}
      >
        <MessageBox />
      </Box>
      <Box>
        <Footer />
      </Box>
    </Stack>
  );
};

export default Converstation;
