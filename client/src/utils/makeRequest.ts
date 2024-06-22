import axios from "axios";

export const makeRequest = (token?: string) =>
  axios.create({
    baseURL: "http://localhost:3000/",
    headers: { Authorization: token }
  });
