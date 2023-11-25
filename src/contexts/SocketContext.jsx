import { useState, useEffect, createContext } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import * as _ from "lodash";

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

  const { isLoggedIn, token, userId } = useSelector((state) => state.auth);

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
    }
    return () => {
      socket?.off("connect_error");
    };
  }, [isLoggedIn, socket]);

  // useEffect(() => {
  //   let interval;
  //   if (socket && socket.connected && !interval) {
  //     interval = setInterval(() => {
  //       let start = Date.now();
  //       socket?.emit("ping", () => {
  //         const duration = Date.now() - start;
  //         setPing(duration);
  //       });
  //     }, 5000);
  //   }
  //   return () => {
  //     clearInterval(interval);
  //     interval = null;
  //   };
  // }, [socket, connection]);

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
