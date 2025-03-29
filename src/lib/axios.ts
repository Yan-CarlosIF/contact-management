import axios from "axios";

export const api = axios.create({
  baseURL: "https://contact-management-api-2eql.onrender.com",
  withCredentials: true,
});
