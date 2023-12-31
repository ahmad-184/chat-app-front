import {
  Fragment,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Stack, Box, useTheme, Typography, alpha } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import useInfiniteScroll from "react-infinite-scroll-hook";
import * as _ from "lodash";

import LoaderButton from "../../LoaderButton";

import { Timeline, NewMessage, Message } from "./messageTypes";
import { getCurrentConversation } from "../../../app/slices/conversation";
import {
  getAllMessages,
  fetchMoreMessageThunk,
} from "../../../app/slices/message";
import { ArrowDown } from "@phosphor-icons/react";

import { getToken } from "../../../app/slices/auth";

import { fDate } from "../../../utils/formatTime";
import LoadingSvg from "../../../assets/Illustration/LoaderSvg";
import Spinner from "../../Spinner";
import LightBox, { filterFiles } from "../../LightBox";

const Msg = ({ showMenu = true, showTime = true }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const msgs = useSelector(getAllMessages);
  const {
    loading: isLoading,
    hasNextPage,
    currentPage,
    error,
    fetchMoreLoading,
  } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const {
    _id: room_id,
    unseen,
    createdAt,
  } = useSelector(getCurrentConversation);
  const token = useSelector(getToken);
  const boxRef = useRef(null);
  const scrollButtonRef = useRef(null);
  const [secondLoading, setSecondLoading] = useState(false);

  const getImagesAndVideos = useMemo(() => {
    const messagesWithFiles = Object.values(msgs)
      .filter((item) => item?.files?.length)
      .map((item) => item?.files)
      .map((item) => item);

    const filtered = filterFiles(_.flattenDeep(messagesWithFiles));
    return filtered;
  }, [room_id, msgs]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const closeLightbox = () => setLightboxOpen(false);
  const openLightbox = () => setLightboxOpen(true);
  const changeLightboxIndex = (url) => {
    setLightboxIndex(() => {
      const findIndex = getImagesAndVideos.findIndex((item) =>
        item.type === "image" ? item.src === url : item.sources[0].src === url
      );
      return findIndex;
    });
  };

  const firstUnseenMsg = useMemo(() => {
    if (unseen) return unseen[0];
  }, [room_id]);

  const [isRoomChange, setIsRoomChange] = useState(false);

  const fetchMoreMessage = () => {
    if (!hasNextPage) return;
    if (fetchMoreLoading) return;
    if (secondLoading) return;
    setSecondLoading(true);
    console.log("fetch more message");
    const lastScroll = msgs[1];
    dispatch(
      fetchMoreMessageThunk({
        token,
        conversation_id: room_id,
        page: currentPage,
      })
    ).then(() => {
      setSecondLoading(false);
      boxRef.current
        ?.querySelector(`[id='${lastScroll?._id}']`)
        .scrollIntoView({
          block: "center",
        });
    });
  };

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading: secondLoading || fetchMoreLoading,
    hasNextPage,
    onLoadMore: fetchMoreMessage,
    disabled: true,
    rootMargin: "0px 0px 0px 0px",
    delayInMs: 100,
  });

  const handleScrollDown = async ({
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
    };

    boxRef.current?.addEventListener("scroll", handler);
    return () => {
      boxRef.current?.removeEventListener("scroll", handler);
    };
  }, [msgs, boxRef, scrollButtonRef]);

  useEffect(() => {
    if (unseen?.length) return;
    if (
      room_id &&
      Object.entries(msgs)?.length &&
      boxRef?.current &&
      isRoomChange === false
    ) {
      setIsRoomChange(true);
    }
  }, [room_id, msgs]);

  console.log(isRoomChange);
  useEffect(() => {
    return () => {
      setIsRoomChange(false);
    };
  }, [room_id]);

  useEffect(() => {
    if (unseen?.length) return;
    if (isRoomChange === true && room_id && Object.entries(msgs).length) {
      handleScrollDown({});
    }
  }, [isRoomChange, room_id]);

  if (isLoading) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        width="100%"
        position="relative"
        height="100%"
      >
        <Spinner />
      </Stack>
    );
  }

  return (
    <Box width="100%" position="relative" height="100%">
      {Boolean(fetchMoreLoading || secondLoading) && (
        <Stack
          justifyContent="center"
          direction="row"
          width="100%"
          position="absolute"
          sx={{
            inset: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "100%",
            backgroundColor:
              mode === "light"
                ? alpha(theme.palette.grey[50], 0.6)
                : alpha(theme.palette.grey[800], 0.8),
            alignItems: "center",
            zIndex: 3,
          }}
        >
          <LoadingSvg color={theme.palette.grey[600]} />
        </Stack>
      )}
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
        display={Object.keys(msgs)?.length ? "block" : "none"}
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
        ref={(el) => {
          boxRef.current = el;
          rootRef.current = el;
        }}
        id="chat_view"
      >
        <Box ref={sentryRef}></Box>
        {hasNextPage ? (
          <>
            {Boolean(!fetchMoreLoading && !secondLoading) ? (
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
            ) : null}
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
          if (item?.type === "timeline")
            return (
              <Timeline
                data={item.date}
                key={index + item?._id}
                showMenu={showMenu}
                showTime={showTime}
              />
            );
          return (
            <Fragment key={index + item?._id}>
              {firstUnseenMsg === item?._id ? <NewMessage /> : null}
              <Message
                data={item}
                showMenu={showMenu}
                showTime={showTime}
                openLightbox={openLightbox}
                changeLightboxIndex={changeLightboxIndex}
              />
            </Fragment>
          );
        })}
        {lightboxOpen ? (
          <LightBox
            open={lightboxOpen}
            close={closeLightbox}
            index={lightboxIndex}
            slides={getImagesAndVideos}
          />
        ) : null}
      </Stack>
    </Box>
  );
};

export default Msg;
