import variableAssignMent from "@utils/variableAssignment";
import axios from "axios";
import { useMutation } from "react-query";
import kakaoRequset from "src/lib/axios/kakaoRequest";
import { LocationAddressResponse } from "types/search/location/LocationAddressResponse";

type GetMapsLocationVariables = {
  kakaoRestApiKey: string;
  longitude: number;
  latitude: number;
};

export const API_GET_LOCATION_ADDRESS_KEY =
  "/v2/local/geo/coord2address.json?x={{longitude}}&y={{latitude}}";

const getLocationAddress = async ({
  kakaoRestApiKey,
  longitude,
  latitude,
}: GetMapsLocationVariables) => {
  const { data } = await kakaoRequset.get<LocationAddressResponse>(
    variableAssignMent(API_GET_LOCATION_ADDRESS_KEY, {
      longitude: longitude.toString(),
      latitude: latitude.toString(),
    }),
    {
      headers: { authorization: `KakaoAK ${kakaoRestApiKey}` },
    }
  );
  return data;
};

export default getLocationAddress;
