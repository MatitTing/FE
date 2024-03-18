import defaultRequest from "src/lib/axios/defaultRequest";

export const patchParty = async ({
  id,
  params,
}: {
  id: string;
  params: PartyInfo;
}) => await defaultRequest.patch(`/api/party/${id}`, { ...params });
