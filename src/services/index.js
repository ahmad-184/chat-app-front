import axios from "../utils/axios";

// @Route http://localhost:9000/api/auth/login
// @Desc POST login user
export const loginUserApi = async (data) => {
  return await axios.post("/auth/login", { ...data });
};

// @Route http://localhost:9000/api/auth/register
// @Desc POST register user
export const registerUserApi = async (data) => {
  return await axios.post("/auth/register", { ...data });
};

// @Route http://localhost:9000/api/auth/forgot_password
// @Desc POST get user email and send a reset password link to user email
export const forgotPasswordApi = async (data) => {
  return await axios.post("/auth/forgot_password", { ...data });
};

// @Route http://localhost:9000/api/auth/reset_password
// @Desc POST reset user password
export const resetPasswordApi = async (data) => {
  return await axios.post("/auth/reset_password", { ...data });
};

// @Route http://localhost:9000/api/auth/verify
// @Desc POST verify user account
export const verifyUserApi = async (data) => {
  return await axios.post("/auth/verify_account", { ...data });
};

// @Route http://localhost:9000/api/user/get_users
// @Desc GET get all users
export const getAllUsersApi = async ({ token }) => {
  return await axios.get("/user/get_users", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// @Route http://localhost:9000/api/user/get_friends
// @Desc GET get all friends
export const getAllFriendsApi = async ({ token }) => {
  return await axios.get("/user/get_friends", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// @Route http://localhost:9000/api/user/get_friend_requests
// @Desc GET get friend requests
export const getFriendRequestsApi = async ({ token }) => {
  return await axios.get("/user/get_friend_requests", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// @Route http://localhost:9000/api/conversation/get_conversations
// @Desc GET get conversation chat conversations
export const fetchChatConversationsApi = async ({ token }) => {
  return await axios.get("/conversation/get_conversations", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// @Route http://localhost:9000/api/conversation/get_messages
// @Desc GET get conversation messages
export const fetchMessagesApi = async ({ token, conversation_id }) => {
  return await axios.get(`/conversation/get_messages/${conversation_id}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
