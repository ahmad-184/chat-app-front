import { useEffect, useRef, useTransition } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  setMessageSeen,
  removeUnseenMsg,
} from "../../../../app/slices/chat_conversation";
import useSocket from "../../../../hooks/useSocket";

const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom + (rect.height - 10) <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /* or $(window).width() */
  );
};

const MessageWrapper = (Wrapper) => (props) => {
  const { data } = props;
  const { userId } = useSelector((state) => state.auth);
  const { room_id } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();

  const { socket } = useSocket();

  const boxRef = useRef(null);

  useEffect(() => {
    if (data?.sender === userId || data?.status === "Seen") return;
    const chatViewBox = document.querySelector("#chat_view");
    let isVisible = false;

    const handleUpdateMessageStatus = () => {
      if (Boolean(isVisible)) {
        chatViewBox?.removeEventListener("scroll", handleUpdateMessageStatus);
        return;
      } else {
        startTransition(() => {
          const messageText = isElementInViewport(boxRef.current);
          isVisible = Boolean(messageText) ? true : false;
          if (Boolean(isVisible)) {
            socket.emit("update_message_status_to_Seen", {
              message_id: data?._id,
            });
            dispatch(removeUnseenMsg({ msg_id: data._id, conv_id: room_id }));
            dispatch(setMessageSeen(data._id));
            chatViewBox?.removeEventListener(
              "scroll",
              handleUpdateMessageStatus
            );
          }
        });
      }
    };

    handleUpdateMessageStatus();

    chatViewBox?.addEventListener("scroll", handleUpdateMessageStatus);

    return () => {
      chatViewBox?.removeEventListener("scroll", handleUpdateMessageStatus);
    };
  }, [data, room_id]);

  return (
    <>
      <Wrapper {...props} ref={boxRef} />
    </>
  );
};

export default MessageWrapper;
