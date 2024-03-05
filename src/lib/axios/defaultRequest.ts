import axios from "axios";
import { getCookie } from "cookies-next";

const defaultRequest = axios.create({
  baseURL: process.env.MATITTING_HOST_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

defaultRequest.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const { config } = error;
    // 에러 발생시
    const refreshToken = getCookie("refreshToken");

    // 토큰 갱신 요청
    const response = await defaultRequest.get("/oauth2/renew-token", {
      headers: {
        "Authorization-Refresh": refreshToken,
      },
    });

    console.log(response, refreshToken, "토큰 처리!");

    // 응답 헤더에서 Authorization 값을 꺼내와서 인스턴스 헤더에 기본 값으로 설정
    defaultRequest.defaults.headers["Authorization"] =
      response.headers["authorization"];

    // 재요청 횟수 제한
    if (!error.config.retryCount) {
      error.config.retryCount = 0;
    }
    if (error.config.retryCount >= 3) {
      return Promise.reject(error);
    }
    error.config.retryCount += 1;

    // // 에러가 발생한 요청 재요청
    error.config.headers["Authorization"] = response.headers["authorization"];
    return defaultRequest.request(error.config);
  }
);

export default defaultRequest;
