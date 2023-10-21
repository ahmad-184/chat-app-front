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
