import axios from "axios";
import { useMutation } from "react-query";

type KeywordToLocationResponse = {
  documents: [
    {
      address_name: string;
      category_group_code: string;
      category_group_name: string;
      category_name: string;
      distance: string;
      id: string;
      phone: string;
      place_name: string;
      place_url: string;
      road_address_name: string;
      x: string;
      y: string;
    }
  ];
  meta: {
    is_end: boolean;
    pageable_count: number;
    same_name: {
      keyword: string;
      region: [];
      selected_region: string;
    };
    total_count: number;
  };
};

type GetMapsLocationVariables = {
  kakaoRestApiKey: string;
  keyword: string;
};

const fetchGetLocationWithKeyword = async ({
  kakaoRestApiKey,
  keyword,
}: GetMapsLocationVariables) => {
  const { data } = await axios.get<KeywordToLocationResponse>(
    `https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=15&sort=accuracy&query=${keyword}`,
    {
      headers: { authorization: `KakaoAK ${kakaoRestApiKey}` },
    }
  );
  return data;
};

export const useGetLocationWithKeywordMutation = () =>
  useMutation<KeywordToLocationResponse, any, GetMapsLocationVariables>(
    ({ kakaoRestApiKey, keyword }: GetMapsLocationVariables) =>
      fetchGetLocationWithKeyword({ kakaoRestApiKey, keyword })
  );
