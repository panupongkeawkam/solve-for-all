import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = import.meta.env.SERVER_HOST;

const defaultAxios = axios.create({
  baseURL: import.meta.env.SERVER_HOST,
});

const authAxios = axios.create({
  baseURL: import.meta.env.SERVER_HOST,
  withCredentials: true
});

export { authAxios };

export default defaultAxios;
