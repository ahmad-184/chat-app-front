import io from "socket.io-client";

let socket = null;

const socketConnect = (userId, token) => {
  const lang = window.localStorage.getItem("lang");

  socket = io("http://localhost:9000", {
    query: {
      user_id: userId,
      lang,
    },
    auth: {
      token,
    },
  });
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export { socket, socketConnect, disconnectSocket };
