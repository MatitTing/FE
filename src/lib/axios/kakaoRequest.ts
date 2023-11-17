import axios from "axios";

const kakaoRequset = axios.create({
  baseURL: process.env.KAKAO_HOST_URL,
});

export default kakaoRequset;
