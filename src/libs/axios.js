import configs from "@/configs";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: configs.apiUrl + "/api/" + configs.apiVersion,
});

export default axiosInstance;
