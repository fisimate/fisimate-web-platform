import { apiUrl, apiVersion } from "@/configs";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${apiUrl}/${apiVersion}`,
  withCredentials: true,
});

export default axiosInstance;
