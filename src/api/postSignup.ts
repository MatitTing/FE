import defaultRequest from "src/lib/axios/defaultRequest";

interface PostSignupParameter {
  userId: number;
  nickname: string;
  birthday: string;
  gender: string;
}

const postSignup = async (body: PostSignupParameter) => {
  const data = await defaultRequest.post("/oauth2/signup", { ...body });
  return data;
};

export default postSignup;
