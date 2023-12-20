import {
  useState,
  useCallback,
  useEffect,
  useTransition,
  Fragment,
  useRef,
  useDeferredValue,
} from "react";
import { Stack, Box, useTheme, alpha, IconButton } from "@mui/material";
import { Microphone, PaperPlaneRight, LinkSimple, Image } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";
import ObjectId from "bson-objectid";
import { toast } from "sonner";

import {
  getCurrentConversation,
  changeLastMessage,
} from "../../../app/slices/conversation";
import {
  addMessage,
  setMessageDelivered,
  createMessageThunk,
} from "../../../app/slices/message";
import Input from "./Input";
import { fullDate } from "../../../utils/formatTime";
import useSocket from "../../../hooks/useSocket";
import FilesThumbnailes from "./FilesThumbnaile";

import uploader from "../../../utils/uploader";

import LoaderButton from "../../LoaderButton";
import CircularProgressWithLabel from "../../CircularProgressWithLabel";

const buttons = [
  {
    icon: <Image size={23} weight="regular" />,
  },
  {
    icon: <LinkSimple size={23} weight="regular" />,
  },
  // {
  // icon: <Microphone size={23} weight="regular" />,
  // },
];

const Footer = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const dispatch = useDispatch();
  const { room_id } = useSelector((state) => state.app);
  const { userId, token } = useSelector((state) => state.auth);
  const { friend_id, _id, status } = useSelector(getCurrentConversation);
  const [files, setFiles] = useState([]);
  const [inputText, setInputText] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const deferredFiles = useDeferredValue(files);

  const ImageFileRef = useRef(null);
  const DocFileRef = useRef(null);

  const { socket } = useSocket();

  const [__, startTransition] = useTransition();

  const handleChangeTextInput = (text) => {
    setInputText(`${text}`);
  };

  const handleAddEmoji = (emoji) => setInputText(`${inputText || ""}${emoji}`);

  const setInputTextEmpty = () => setInputText("");

  const handleSendMessage = async () => {
    try {
      const isInputEmpty = Boolean(
        !inputText || !inputText.length || !inputText.trim().length
      );
      if (isInputEmpty && !files.length) return;

      setUploadLoading(true);
      const filesData = await uploader(files, setUploadProgress).finally(() => {
        setUploadLoading(false);
        setFiles([]);
      });

      const newId = new ObjectId().toHexString();
      const data = {
        _id: newId,
        conversation_id: _id,
        text: inputText || "",
        files: filesData,
        sender: userId,
        receiver: friend_id,
        status: "Created",
        edited: false,
        // replay: {},
        // deleted: false,
        createdAt_day: fullDate(Date.now()),
        createdAt: Date.now(),
      };
      dispatch(addMessage(data));
      setInputTextEmpty();
      await dispatch(createMessageThunk({ token, data })).then((response) => {
        const { message_id, status, message } = response.payload.data;
        if (status === "OK") {
          startTransition(async () => {
            dispatch(setMessageDelivered(message));
            dispatch(changeLastMessage(message));
            socket.emit("send_message", {
              message_id,
              room_id,
              user_id: userId,
            });
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const startTyping = useCallback(
    _.throttle(
      () => {
        if (status === "Offline") return;
        socket.emit("update_typing_status", {
          conversatoin_id: _id,
          user_id: userId,
          typing_status: true,
        });
      },
      3000,
      { trailing: false }
    ),
    [room_id, status]
  );

  const stopTyping = useCallback(
    _.debounce(() => {
      if (status === "Offline") return;
      socket.emit("update_typing_status", {
        conversatoin_id: _id,
        user_id: userId,
        typing_status: false,
      });
    }, 1000),
    [room_id, status]
  );

  useEffect(() => {
    return () => {
      setInputTextEmpty();
      setFiles([]);
    };
  }, [room_id]);

  const handleSelectFile = useCallback(
    (e, index) => {
      const files = e.target.files;
      Object.values(files).forEach(async (file) => {
        if (file.size >= 10000000)
          return toast.warning("File size must be less than 10mb");
        const fileType = file.type.split("/")[0];
        const isExe = Boolean(file.name.split(".").at(-1) === "exe");
        if (isExe)
          return toast.error("Unfortunately exe file type not supported");
        console.log(file);
        const reader = new FileReader();
        await reader.readAsDataURL(file);
        reader.onload = (f) => {
          setFiles((prev) => [
            ...prev,
            {
              file,
              fileData: f.target.result,
              type:
                fileType === "image"
                  ? "image"
                  : fileType === "video"
                  ? "video"
                  : fileType === "audio"
                  ? "audio"
                  : file.type.split("/")[1],
            },
          ]);
        };
      });
    },
    [room_id]
  );

  const removeFile = (fileName) => {
    setFiles((prev) => prev.filter((item) => item.file.name !== fileName));
  };

  return (
    <Box>
      <FilesThumbnailes files={deferredFiles} removeFile={removeFile} />
      <Box
        p={2}
        width="100%"
        borderTop="1px solid"
        position="relative"
        sx={{
          backgroundColor: mode === "light" ? "grey.100" : "grey.800",
        }}
        borderColor={
          mode === "light" ? alpha(theme.palette.grey[300], 0.5) : "grey.800"
        }
      >
        <Stack direction="row" spacing={2} alignItems="stretch" width="100%">
          <Box display="flex" flexGrow={1}>
            <Input
              textInput={inputText}
              handleChangeTextInput={handleChangeTextInput}
              handleAddEmoji={handleAddEmoji}
              handleSendMessage={handleSendMessage}
              startTyping={startTyping}
              stopTyping={stopTyping}
            />
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
            {buttons.map(({ icon }, index) => (
              <Fragment key={index}>
                <IconButton
                  sx={{
                    color:
                      mode === "light" ? "primary.light" : "primary.lighter",
                  }}
                  onClick={() => {
                    if (index === 0) {
                      ImageFileRef.current.click();
                    } else if (index === 1) {
                      DocFileRef.current.click();
                    }
                  }}
                >
                  {icon}
                </IconButton>
                <input
                  hidden
                  ref={
                    index === 0 ? ImageFileRef : index === 1 ? DocFileRef : null
                  }
                  onChange={(e) => handleSelectFile(e, index)}
                  multiple
                  type="file"
                  accept={
                    index === 0
                      ? "image/png,image/jpeg,image/gif,image/webp,video/mp4,video/mpeg,audio/mpeg"
                      : "*"
                  }
                />
              </Fragment>
            ))}
            <LoaderButton
              color="primary"
              sx={{
                height: "100%",
                boxShadow: "none",
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                color: mode === "light" ? "primary.light" : "primary.lighter",
                borderRadius: 1.5,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.4),
                },
              }}
              disabled={uploadLoading}
              variant="contained"
              onClick={handleSendMessage}
            >
              {!uploadLoading && <PaperPlaneRight size={23} weight="fill" />}
              {uploadLoading && (
                <CircularProgressWithLabel
                  value={uploadProgress}
                  sx={{
                    "& .MuiCircularProgress-circle": {
                      color:
                        mode === "light" ? "primary.main" : "primary.light",
                    },
                  }}
                />
              )}
            </LoaderButton>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
