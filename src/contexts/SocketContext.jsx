import { useState, useEffect, createContext, useCallback } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";

import {
  logOutChatConv,
  removeConversation,
} from "../app/slices/chat_conversation";
import { logOut } from "../app/slices/auth";
import { appLogout, selectConversation } from "../app/slices/app";
import { errorToast } from "../components/ToastProvider";

const lang = window.localStorage.getItem("lang");

const initial = {
  socket: null,
  connection: false,
  ping: null,
};

const SocketContext = createContext(initial);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connection, setConnection] = useState(false);
  const [ping, setPing] = useState(null);

  const dispatch = useDispatch();

  const { isLoggedIn, token, userId } = useSelector((state) => state.auth);
  const { room_id } = useSelector((state) => state.app);

  useEffect(() => {
    if (isLoggedIn) {
      if (!socket) {
        setSocket(() =>
          io("http://localhost:9000", {
            query: {
              user_id: userId,
              lang: lang || "en",
            },
            auth: {
              token,
            },
          })
        );
      }
      if (socket && !socket.connected) {
        socket.connect();
        setConnection(true);
      }
    }
    if (!isLoggedIn && socket) {
      socket.disconnect();
    }
  }, [isLoggedIn]);

  const handleLeaveApp = useCallback(async () => {
    await dispatch(appLogout());
    await dispatch(logOutChatConv());
    await dispatch(logOut());
    window.localStorage.removeItem("redux-root");
    window.location = "/auth.login";
    window.location.reload();
  }, []);

  useEffect(() => {
    if (isLoggedIn && socket) {
      // socket.on("connection", () => {
      // });

      socket?.on("connect", () => {
        setConnection(true);
      });

      socket?.on("disconnect", () => {
        setConnection(false);
      });

      socket.on("error", (data) => {
        errorToast({ message: data.message });
        if (data.code && data.code === "CONV_NOT_EXIST") {
          dispatch(removeConversation(data.conv_id));
          dispatch(selectConversation({ caht_type: "idle", room_id: "" }));
        }
      });

      socket.on("auth_error", (message) => {
        errorToast({ message });
        setTimeout(handleLeaveApp, 4000);
      });
    }
    return () => {
      socket?.off("connect_error");
      socket?.off("error");
      socket?.off("auth_error");
    };
  }, [isLoggedIn, socket]);

  // useEffect(() => {
  //   let interval;
  //   if (isLoggedIn && socket && socket.connected && !interval) {
  //     interval = setInterval(() => {
  //       let start = Date.now();
  //       socket?.emit("ping", () => {
  //         const duration = Date.now() - start;
  //         console.log(duration);
  //         setPing(duration);
  //       });
  //     }, 5000);
  //   }
  //   return () => {
  //     clearInterval(interval);
  //     interval = null;
  //   };
  // }, [socket, connection, isLoggedIn]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        connection,
        ping,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext };

export default SocketProvider;
