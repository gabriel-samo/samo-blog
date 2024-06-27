import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";

export const makeRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});
