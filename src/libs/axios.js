import { apiUrl, apiVersion } from "@/configs";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: apiUrl + "/api/" + apiVersion
});

export default axiosInstance;
