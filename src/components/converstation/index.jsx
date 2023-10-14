import { Box, Stack } from "@mui/material";

import Header from "./header";
import Msg from "./msg";
import Footer from "./footer";

const Converstation = () => {
  return (
    <Stack direction="column" width="100%" height="100%">
      <Box backgroundColor="black">
        <Header />
      </Box>
      <Box display="flex" flexGrow={1}>
        <Msg />
      </Box>
      <Box>
        <Footer />
      </Box>
    </Stack>
  );
};

export default Converstation;
