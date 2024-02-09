import defaultRequest from "src/lib/axios/defaultRequest";
import { PostLoginResponse } from "types/signs";

export interface postLoginParameter {
  oauthProvider: "NAVER" | "KAKAO";
  code: string;
  state?: string;
}

export const API_POST_LOGIN_KEY = "/oauth2/login";

const postLogin = async (body: postLoginParameter) => {
  const { data } = await defaultRequest.post<PostLoginResponse>(
    API_POST_LOGIN_KEY,
    body
  );
  return data;
};

export default postLogin;
