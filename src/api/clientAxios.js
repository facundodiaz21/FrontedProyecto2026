import axios from "axios";

const clientAxios = axios.create({
  baseURL: "http://localhost:3000/api",
});
export default clientAxios;
