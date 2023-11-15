import { Box } from "@mui/material";

import Header from "./Header";
import Container from "../Container";
import Messages from "../../../../../components/chat_converstation/msg";

const StarredMessages = () => {
  return (
    <Container>
      <Header />
      <Box height="calc(100% - 80px)">
        <Messages showMenu={false} showTime={false} />
      </Box>
    </Container>
  );
};

export default StarredMessages;
