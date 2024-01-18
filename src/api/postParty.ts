import defaultRequest from "src/lib/axios/defaultRequest";

export type SetPartyRequestParam = {
  title: string;
  content: string;
  partyTime: string;
  totalParticipant: number;
  longitude: number;
  latitude: number;
  gender: string;
  category: string;
  age: string;
  thumbnail?: string;
};

export interface SetPartyResponse {
  partyId: string;
}

export const postParty = async (params: SetPartyRequestParam) =>
  await defaultRequest.post("/api/party", { ...params });
