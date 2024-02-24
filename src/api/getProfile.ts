import defaultRequest from "src/lib/axios/defaultRequest";
import { UserProfileResponse } from "types/profile/user/UserProfileResponse";
import variableAssignMent from "@utils/variableAssignment";

export const API_GET_PROFILE_KEY = "/api/profile/{{userId}}";

const getProfile = async ({ userId }: any): Promise<UserProfileResponse> => {
  const { data } = await defaultRequest.get(
    variableAssignMent(API_GET_PROFILE_KEY, { userId })
  );
  return data;
};

export default getProfile;
