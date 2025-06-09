import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.218:8000",
  timeout: 5000,
});

export default api;
