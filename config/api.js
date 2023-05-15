import { default as axios } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.qerja.id/api",
  timeout: 5000,
});

export default axiosInstance;
