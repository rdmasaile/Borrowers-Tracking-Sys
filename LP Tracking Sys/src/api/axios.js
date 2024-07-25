import axios from "axios";

const BASE_URL = "http://localhost:50000";

export default axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
