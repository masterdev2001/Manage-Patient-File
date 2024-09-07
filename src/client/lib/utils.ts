import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api/patients",
});

export default axiosClient;
