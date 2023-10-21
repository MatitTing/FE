import axios from "axios";
import { useMutation } from "react-query";

type PartyDetailResponse = {
  partyTitle: string;
  partyContent: string;
  address: string;
  longitude: string;
  latitude: string;
  status: string;
  gender: string;
  age: string;
  deadline: string;
  partyTime: string;
  totalParticipate: number;
  participate: number;
  thumbnail: string;
};

type GetPartyDetailVariables = {
  id: string | string[];
};

const fetchGetLocationWithKeyword = async ({ id }: GetPartyDetailVariables) => {
  const { data } = await axios.get<PartyDetailResponse>(
    `${process.env.BACKEND_URL}/api/party/${id}`
  );
  return data;
};

export const useGetPartyDetailMutation = () =>
  useMutation<PartyDetailResponse, any, GetPartyDetailVariables>(
    ({ id }: GetPartyDetailVariables) => fetchGetLocationWithKeyword({ id })
  );
