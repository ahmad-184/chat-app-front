import axios from "axios";

import { API_BASE_URL } from "../config";

const axiosInstance = axios.create({ baseURL: API_BASE_URL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (err) =>
    Promise.reject((err.response && err.response.data) || "Somthing went wrong")
);

export default axiosInstance;
