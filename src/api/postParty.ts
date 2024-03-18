import defaultRequest from "src/lib/axios/defaultRequest";

export const postParty = async (params: PartyInfo) =>
  await defaultRequest.post("/api/party", { ...params });
