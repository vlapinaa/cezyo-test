import axios from "axios";

export const api = axios.create({
  baseURL: "https://test2.sionic.ru/api/",
});

export default api;
