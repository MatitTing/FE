import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import defaultRequest from "src/lib/axios/defaultRequest";

export type SetPartyRequestParam = {
  // userId: number;
  title: string;
  content: string;
  partyTime: string;
  deadline: string;
  totalParticipant: number;
  longitude: number;
  latitude: number;
  gender: string;
  category: string;
  age: string;
  menu: string;
  thumbnail: string;
};

interface SetPartyResponse {
  partyId: string;
}

const setParty = async (params: SetPartyRequestParam) =>
  await defaultRequest.post("/api/party", { ...params });

const useSetParty = () =>
  useMutation<
    AxiosResponse<SetPartyResponse>,
    AxiosError,
    SetPartyRequestParam
  >({
    mutationFn: setParty,
  });

export default useSetParty;
