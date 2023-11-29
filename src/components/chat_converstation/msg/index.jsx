import {
  Fragment,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Stack, Box, useTheme, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import LoaderButton from "../../LoaderButton";

import {
  TextMsg,
  MediaMsg,
  ReplyMsg,
  LinkMsg,
  DocMsg,
  Timeline,
} from "./messageTypes";
import {
  getAllMessages,
  getCurrentConversation,
  fetchMoreMessageThunk,
} from "../../../app/slices/chat_conversation";
import { ArrowDown } from "phosphor-react";

import NewMessage from "./messageTypes/NewMessage";
import { getToken } from "../../../app/slices/auth";

import { fDate } from "../../../utils/formatTime";

const Msg = ({ showMenu = true, showTime = true }) => {
  const mode = useTheme().palette.mode;
  const msgs = useSelector(getAllMessages);
  const [getMoreMsgLoading, setGetMoreMsgLoading] = useState(false);
  const {
    loading: isLoading,
    hasNextPage,
    currentPage,
  } = useSelector((state) => state.chat_conversation);
  const dispatch = useDispatch();
  const {
    _id: room_id,
    unseen,
    createdAt,
  } = useSelector(getCurrentConversation);
  const token = useSelector(getToken);
  const boxRef = useRef(null);
  const scrollButtonRef = useRef(null);

  const firstUnseenMsg = useMemo(() => unseen[0], [room_id]);

  const fetchMoreMessage = () => {
    if (!hasNextPage) return;
    setGetMoreMsgLoading(true);
    const lastScroll = msgs[1];
    dispatch(
      fetchMoreMessageThunk({
        token,
        conversation_id: room_id,
        page: currentPage,
      })
    ).then(() => {
      setGetMoreMsgLoading(false);
      boxRef.current
        ?.querySelector(`[id='${lastScroll?._id}']`)
        .scrollIntoView({
          block: "center",
        });
    });
  };

  const handleScrollDown = ({
    smooth = null,
    whenLessThan200Return = false,
  }) => {
    const isLessThan200 = Boolean(
      boxRef?.current?.scrollTop + boxRef?.current?.clientHeight >
        boxRef?.current?.scrollHeight - 400
    );

    if (whenLessThan200Return && !isLessThan200) return;

    boxRef?.current?.scroll({
      top: boxRef?.current?.scrollHeight,
      ...(smooth && { behavior: "smooth" }),
    });
  };

  const infiniteScroll = useCallback(
    (e) => {
      if (!hasNextPage) return;
      if (
        e.target.scrollTop === 0 ||
        (e.currentTarget.scrollTop === 0 && Object.entries(msgs))
      ) {
        console.log(e.target.scrollTop);
        fetchMoreMessage();
      }
    },
    [room_id, msgs]
  );

  const handleActiveScrollButton = useCallback((event) => {
    const elem = event?.target || boxRef?.current;
    const active = Boolean(
      elem.scrollTop + elem.clientHeight > elem.scrollHeight - 400
    );
    if (!scrollButtonRef.current) return;
    if (!active) {
      scrollButtonRef.current.style.opacity = 1;
      scrollButtonRef.current.style.visibility = "visible";
    } else {
      scrollButtonRef.current.style.opacity = 0;
      scrollButtonRef.current.style.visibility = "hidden";
    }
  }, []);

  useEffect(() => {
    if (!boxRef.current) return;

    handleActiveScrollButton();

    const handler = (e) => {
      handleActiveScrollButton(e);
      infiniteScroll(e);
    };

    boxRef.current?.addEventListener("scroll", handler);
    return () => {
      boxRef.current?.removeEventListener("scroll", handler);
    };
  }, [msgs, boxRef, scrollButtonRef]);

  useEffect(() => {
    if (unseen.length) {
      return;
    }
    if (Object.keys(msgs).length && boxRef.current) {
      handleScrollDown({});
    }
  }, [msgs, room_id]);

  if (isLoading) {
    return "loading...";
  }

  return (
    <Box width="100%" position="relative" height="100%">
      <Box
        position="absolute"
        sx={{
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        backgroundColor="grey.700"
        color="white"
        borderRadius="50%"
        p={1}
        bottom={15}
        right={15}
        lineHeight={0}
        zIndex={1}
        ref={scrollButtonRef}
        onClick={() => handleScrollDown({ smooth: true })}
        display={Object.keys(msgs).length ? "block" : "none"}
      >
        <ArrowDown size={22} />
      </Box>
      <Stack
        direction="column"
        height="100%"
        width="100%"
        sx={{
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "7px",
          },
          "&::-webkit-scrollbar-track": {},
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: mode === "light" ? "grey.300" : "grey.700",
            borderRadius: "2",
            "&:hover": {
              backgroundColor: mode === "light" ? "grey.400" : "grey.600",
            },
          },
        }}
        spacing={1.5}
        pt={2}
        pb={2}
        px={{ xs: 2, md: 4 }}
        ref={boxRef}
        id="chat_view"
      >
        {hasNextPage ? (
          <>
            {getMoreMsgLoading ? (
              <Typography variant="body1">loading...</Typography>
            ) : (
              <LoaderButton
                variant="text"
                fontSize="caption"
                color="inherit"
                loading={isLoading}
                onClick={fetchMoreMessage}
                sx={{
                  color: mode === "dark" && "grey.400",
                }}
              >
                loading more
              </LoaderButton>
            )}
          </>
        ) : (
          <Stack>
            <Typography
              variant="caption"
              sx={{ color: mode === "dark" && "grey.400" }}
              textAlign={"center"}
            >
              Conversation created at{" "}
              <span style={{ textDecoration: "underline" }}>
                {fDate(createdAt || Date.now())}
              </span>
            </Typography>
          </Stack>
        )}
        {msgs?.map((item, index) => {
          const msgType = item?.type;
          switch (msgType) {
            case "Image": {
              return (
                <MediaMsg
                  data={item}
                  key={index + item?._id}
                  showMenu={showMenu}
                  showTime={showTime}
                />
              );
            }
            case "Link": {
              return (
                <LinkMsg
                  data={item}
                  key={index + item?._id}
                  showMenu={showMenu}
                  showTime={showTime}
                />
              );
            }
            case "Doc": {
              return (
                <DocMsg
                  data={item}
                  key={index + item?._id}
                  showMenu={showMenu}
                  showTime={showTime}
                />
              );
            }
            case "Replay": {
              return (
                <ReplyMsg
                  data={item}
                  key={index + item?._id}
                  showMenu={showMenu}
                  showTime={showTime}
                />
              );
            }
            case "timeline": {
              return (
                <Timeline
                  data={item.date}
                  key={index + item?._id}
                  showMenu={showMenu}
                  showTime={showTime}
                />
              );
            }
            default: {
              return (
                <Fragment key={index + item?._id}>
                  {firstUnseenMsg === item?._id ? <NewMessage /> : null}
                  <TextMsg
                    data={item}
                    showMenu={showMenu}
                    showTime={showTime}
                  />
                </Fragment>
              );
            }
          }
        })}
      </Stack>
    </Box>
  );
};

export default Msg;
