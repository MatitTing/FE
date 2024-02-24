import defaultRequest from "src/lib/axios/defaultRequest";
import variableAssignMent from "@utils/variableAssignment";

interface patchProfileParameter {
  userId: string;
  nickname: string;
  imgUrl: string;
}

export const API_PATCH_PROFILE_KEY = "/api/party/{{userId}}";

const patchProfile = async ({
  userId,
  nickname,
  imgUrl,
}: patchProfileParameter) => {
  return defaultRequest.patch(
    variableAssignMent(API_PATCH_PROFILE_KEY, { userId }),
    { nickname, imgUrl }
  );
};

export default patchProfile;
