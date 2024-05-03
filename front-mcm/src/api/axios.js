import axios from "axios";
import Cokies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/apiv1",
  withCredentials: true,
  credentials: "include",
  withXSRFToken: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
})

axiosInstance.interceptors.request.use((config) => {
  const token = Cokies.get("token");
  if (token) {
    config.headers['authorization-token'] = `${token}`;
  }
  return config
})




export default axiosInstance