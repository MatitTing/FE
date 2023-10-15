import axios from "axios";
import { useMutation } from "react-query";

type LocationAddressResponse = {
  documents: [
    {
      road_address: {
        address_name: string;
        region_1depth_name: string;
        region_2depth_name: string;
        region_3depth_name: string;
        road_name: string;
        underground_yn: string;
        main_building_no: string;
        sub_building_no: string;
        building_name: string;
        zone_no: string;
      };
      address: {
        address_name: string;
        region_1depth_name: string;
        region_2depth_name: string;
        region_3depth_name: string;
        mountain_yn: string;
        main_address_no: string;
        sub_address_no: string;
      };
    }
  ];
  meta: {
    total_count: number;
  };
};

type GetMapsLocationVariables = {
  kakaoRestApiKey: string;
  longitude: number;
  latitude: number;
};

const fetchGetLocationAddress = async ({
  kakaoRestApiKey,
  longitude,
  latitude,
}: GetMapsLocationVariables) => {
  const { data } = await axios.get<LocationAddressResponse>(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
    {
      headers: { authorization: `KakaoAK ${kakaoRestApiKey}` },
    }
  );
  return data;
};

export const useGetLocationAddressMutation = () =>
  useMutation<LocationAddressResponse, any, GetMapsLocationVariables>(
    ({ kakaoRestApiKey, longitude, latitude }: GetMapsLocationVariables) =>
      fetchGetLocationAddress({ kakaoRestApiKey, longitude, latitude })
  );
