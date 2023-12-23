import variableAssignment from "@utils/variableAssignment";
import defaultRequest from "src/lib/axios/defaultRequest";
import { SearchRankResponse } from "types/search/SearchRankResponse";

export const API_GET_SEARCH_RANK = "/api/search/rank";

const getSearchRank = async () => {
  //TODO 백엔드 api 변경으로 추후 response값은 재 변경 예정. 임시 타입임.
  const { data } = await defaultRequest.get<string[]>(
    variableAssignment(API_GET_SEARCH_RANK)
  );

  return data;
};

export default getSearchRank;
