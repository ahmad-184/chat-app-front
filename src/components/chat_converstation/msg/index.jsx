import { Stack, Box } from "@mui/material";

import { Chat_History } from "../../../data";

import {
  TextMsg,
  MediaMsg,
  ReplyMsg,
  LinkMsg,
  DocMsg,
  Timeline,
} from "./messageTypes";
import { SimpleBarStyle } from "../../Scrollbar";

const Msg = ({ showMenu = true, showTime = true }) => {
  const chats = [];

  return (
    <Box width="100%" height="100%">
      <SimpleBarStyle
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Stack
          direction="column"
          height="100%"
          spacing={2.5}
          py={2}
          px={{ xs: 2, md: 4 }}
        >
          {chats.map((item, index) => {
            const msgType = item.type;

            switch (msgType) {
              case "divider": {
                return <Timeline text={item.text} key={index} />;
              }
              case "msg": {
                switch (item.subtype) {
                  case "img": {
                    return (
                      <MediaMsg
                        data={item}
                        key={index}
                        showMenu={showMenu}
                        showTime={showTime}
                      />
                    );
                  }
                  case "link": {
                    return (
                      <LinkMsg
                        data={item}
                        key={index}
                        showMenu={showMenu}
                        showTime={showTime}
                      />
                    );
                  }
                  case "doc": {
                    return (
                      <DocMsg
                        data={item}
                        key={index}
                        showMenu={showMenu}
                        showTime={showTime}
                      />
                    );
                  }
                  case "reply": {
                    return (
                      <ReplyMsg
                        data={item}
                        key={index}
                        showMenu={showMenu}
                        showTime={showTime}
                      />
                    );
                  }
                  default: {
                    return (
                      <TextMsg
                        data={item}
                        key={index}
                        showMenu={showMenu}
                        showTime={showTime}
                      />
                    );
                  }
                }
              }
              default: {
                break;
              }
            }
          })}
        </Stack>
      </SimpleBarStyle>
    </Box>
  );
};

export default Msg;
