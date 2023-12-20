import { useInView } from "react-intersection-observer";
import { useSelector, useDispatch } from "react-redux";

import { getUserId } from "../app/slices/auth";
import { changeMessageStatus } from "../app/slices/message";
import { changeConversationUnseenMessage } from "../app/slices/conversation";
import useSocket from "../hooks/useSocket";

const MessagesHOC = (Wrapper) => (props) => {
  const { data } = props;
  const userId = useSelector(getUserId);
  const { socket } = useSocket();
  const dispatch = useDispatch();

  const handleChange = (visibility) => {
    if (visibility) {
      socket.emit("update_message_status_to_Seen", {
        message_id: data?._id,
      });
      dispatch(
        changeMessageStatus({
          msg_id: data?._id,
          conv_id: data?.conversation_id,
        })
      );
      dispatch(
        changeConversationUnseenMessage({
          msg_id: data?._id,
          conv_id: data?.conversation_id,
        })
      );
    }
  };

  const [ref] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px",
    delay: 1000,
    skip: data?.sender === userId || data?.status === "Seen",
    onChange: handleChange,
  });

  return (
    <>
      <Wrapper {...props} ref={ref} />
    </>
  );
};

export default MessagesHOC;
