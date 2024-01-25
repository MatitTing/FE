import defaultRequest from "src/lib/axios/defaultRequest";

export interface SetPartyResponse {
  partyId: string;
}

export const postParty = async (params: PartyInfo) =>
  await defaultRequest.post("/api/party", { ...params });

export const postPartyUpdate = async ({
  id,
  params,
}: {
  id: string;
  params: PartyInfo;
}) => await defaultRequest.put(`/api/party/${id}`, { ...params });
