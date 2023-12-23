import variableAssignMent from "@utils/variableAssignment";
import defaultRequest from "src/lib/axios/defaultRequest";
import { PartyListResponse } from "types/common/PartyListResponse";

interface GetMainPageParameter {
  longitude: number;
  latitude: number;
  lastPartyId?: number;
  size?: number;
}

export const API_GET_MAIN_PAGE =
  "/api/main?longitude={{longitude}}&latitude={{latitude}}&lastPartyId={{lastPartyId}}&size={{size}}";

const getMainPageData = async ({
  latitude = 37.54419081960767,
  longitude = 127.0515738292837,
  lastPartyId = 0,
  size = 5,
}: GetMainPageParameter) => {
  const { data } = await defaultRequest.get<
    InfinitePaginationDataType<"partyList", PartyListResponse>
  >(
    variableAssignMent(API_GET_MAIN_PAGE, {
      latitude: String(latitude),
      longitude: String(longitude),
      lastPartyId: String(lastPartyId),
      size: String(size),
    })
  );
  return data;
};

export default getMainPageData;
