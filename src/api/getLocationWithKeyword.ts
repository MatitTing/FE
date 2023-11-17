import variableAssignMent from "@utils/variableAssignment";
import axios from "axios";
import { useMutation } from "react-query";
import kakaoRequset from "src/lib/axios/kakaoRequest";
import { KeywordToLocationResponse } from "types/search/location/KeywordToLocationResponse";

type GetMapsLocationVariables = {
  kakaoRestApiKey: string;
  keyword: string;
};
export const API_GET_LOCATION_WITH_KEYWORD =
  "/v2/local/search/keyword.json?page=1&size=15&sort=accuracy&query={{keyword}}";
const getLocationWithKeyword = async ({
  kakaoRestApiKey,
  keyword,
}: GetMapsLocationVariables) => {
  const { data } = await kakaoRequset.get<KeywordToLocationResponse>(
    variableAssignMent(API_GET_LOCATION_WITH_KEYWORD, { keyword }),
    {
      headers: { authorization: `KakaoAK ${kakaoRestApiKey}` },
    }
  );
  return data;
};

export default getLocationWithKeyword;
