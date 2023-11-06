import io from "socket.io-client";

let socket;

const socketConnect = (userId, token) => {
  socket = io("http://localhost:9000", {
    query: `user_id=${userId}`,
    auth: {
      token,
    },
  });
};

export { socket, socketConnect };
