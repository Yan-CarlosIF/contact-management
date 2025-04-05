import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-contact-management.onrender.com",
  withCredentials: true,
});
