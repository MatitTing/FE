import axios from "axios";

const defaultRequest = axios.create({
  baseURL: process.env.MATITTING_HOST_URL,
});

export default defaultRequest;
