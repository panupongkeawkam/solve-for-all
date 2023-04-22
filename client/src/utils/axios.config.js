import axios from "axios";

axios.defaults.baseURL = import.meta.env.REACT_APP_SERVER_HOST

const defaultAxios = axios.create({
  baseURL: import.meta.env.REACT_APP_SERVER_HOST
});

const authAxios = axios.create({
  baseURL: import.meta.env.REACT_APP_SERVER_HOST
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
