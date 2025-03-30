import axios from "axios";

export const api = axios.create({
  baseURL: "https://contact-management-api-wcsq.onrender.com",
  withCredentials: true,
});
