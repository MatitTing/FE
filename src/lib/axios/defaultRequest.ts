import axios from "axios";

const defaultRequest = axios.create({
  baseURL: process.env.MATITTING_HOST_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default defaultRequest;
