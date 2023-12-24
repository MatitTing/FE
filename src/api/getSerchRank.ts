import variableAssignment from "@utils/variableAssignment";
import defaultRequest from "src/lib/axios/defaultRequest";
import { SearchRankResponse } from "types/search/SearchRankResponse";

export const API_GET_SEARCH_RANK = "/api/search/rank";

const getSearchRank = async () => {
  const { data } = await defaultRequest.get<SearchRankResponse[]>(
    variableAssignment(API_GET_SEARCH_RANK)
  );

  return data;
};

export default getSearchRank;
