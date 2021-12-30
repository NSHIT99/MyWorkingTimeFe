import axios, { AxiosRequestConfig } from "axios";

const axiosConfig = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    "Content-Type": "Application/json",
  },
  withCredentials: true,
});

axiosConfig.interceptors.request.use(
  (config : AxiosRequestConfig) => {
    const accessToken = `Bearer ${localStorage.getItem("token")}`;
    if(accessToken){
      config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    }
    return config
  },
  function (error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosConfig;
