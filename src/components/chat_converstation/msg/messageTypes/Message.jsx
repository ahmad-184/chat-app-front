import { forwardRef, memo, useState } from "react";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";

import MessagesHOC from "../../../../HOC's/MessagesHOC";
import {
  TextMsg,
  MsgContainer,
  ImageMessage,
  VideoMessage,
  AudioMessage,
  FileMessage,
} from "./";

const Message = forwardRef(
  ({ data, showMenu, showTime, openLightbox, changeLightboxIndex }, ref) => {
    const { userId } = useSelector((state) => state.auth);

    const isOutgoing = Boolean(data?.sender === userId);

    return (
      <Stack
        direction="row"
        id={data?._id}
        justifyContent={!isOutgoing ? "start" : "end"}
        ref={ref}
      >
        <MsgContainer data={data} showMenu={showMenu} showTime={showTime}>
          {data?.files &&
            data?.files.map((file, index) => {
              switch (file.type) {
                case "image": {
                  return (
                    <ImageMessage
                      key={index}
                      data={file}
                      openLightbox={openLightbox}
                      changeLightboxIndex={changeLightboxIndex}
                    />
                  );
                }
                case "video": {
                  return (
                    <VideoMessage
                      key={index}
                      data={file}
                      openLightbox={openLightbox}
                      changeLightboxIndex={changeLightboxIndex}
                    />
                  );
                }
                case "audio": {
                  return <AudioMessage key={index} data={file} />;
                }
                default: {
                  return <FileMessage key={index} data={file} />;
                }
              }
            })}
          {data?.text && <TextMsg data={data} />}
        </MsgContainer>
      </Stack>
    );
  }
);

export default memo(MessagesHOC(Message));
