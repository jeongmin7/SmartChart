import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.125.227.145:8080",
  timeout: 100000,
});

export default instance;
