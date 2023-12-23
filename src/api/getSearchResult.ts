import variableAssignment from "@utils/variableAssignment";
import defaultRequest from "src/lib/axios/defaultRequest";
import { PartyListResponse } from "types/common/PartyListResponse";

interface SearchResultParams {
  keyword: string;
  lastPartyId: number;
  size?: number;
}
export const API_GET_SEARCH_RESULT =
  "/api/search?keyword={{keyword}}&lastPartyId={{lastPartyId}}&size={{size}}";

const getSearchResult = async ({
  keyword,
  lastPartyId = 0,
  size = 5,
}: SearchResultParams) => {
  const { data } = await defaultRequest<
    InfinitePaginationDataType<"partyList", PartyListResponse>
  >(
    variableAssignment(API_GET_SEARCH_RESULT, {
      keyword,
      lastPartyId: String(lastPartyId),
      size: String(size),
    })
  );
  return data;
};

export default getSearchResult;
