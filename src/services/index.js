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
