import axios from "../utils/axios";

// @Route http://localhost:9000/api/auth/login
// @Desc POST login user
export const loginUserApi = async (data) => {
  return await axios.post("/auth/login", { ...data });
};
