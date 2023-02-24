import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

const defaultAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

authAxios.interceptors.request.use(
  function (config) {
    const token = "<some_token>";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { authAxios };

export default defaultAxios;
