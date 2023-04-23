import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = import.meta.env.SERVER_HOST;

const defaultAxios = axios.create({
  baseURL: import.meta.env.SERVER_HOST,
});

const authAxios = axios.create({
  baseURL: import.meta.env.SERVER_HOST,
});

authAxios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { authAxios };

export default defaultAxios;
