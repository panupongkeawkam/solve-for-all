import axios from "axios";

import host from "../host.config";

const authAxios = axios.create({
  baseURL: host.BASE_URL,
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
