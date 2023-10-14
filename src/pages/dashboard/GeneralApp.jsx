import { Stack } from "@mui/material";
import Chats from "./chat";

const GeneralApp = () => {
  return (
    <Stack
      direction="row"
      sx={{
        width: {
          xs: "calc(100% - 70px)",
          sm: "calc(100% - 100px)",
        },
      }}
    >
      <Chats />
    </Stack>
  );
};

export default GeneralApp;
