import variableAssignment from "@utils/variableAssignment";
import defaultRequest from "src/lib/axios/defaultRequest";
import { PartyListResponse } from "types/common/PartyListResponse";

interface SearchResultParams {
  keyword: string;
  lastPartyId: number;
  size?: number;
}
export const API_GET_SEARCH_RESULT =
  "/api/search";

const getSearchResult = async (params: SearchResultParams) => {
  const { data } = await defaultRequest<
    InfinitePaginationDataType<"partyList", PartyListResponse>
  >(
  API_GET_SEARCH_RESULT, {
    params:{
      ...params
    }
  }
  );
  return data;
};

export default getSearchResult;
