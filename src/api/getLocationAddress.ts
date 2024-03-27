import variableAssignMent from '@utils/variableAssignment';
import kakaoRequset from 'src/lib/axios/kakaoRequest';
import { LocationAddressResponse } from 'types/search/location/LocationAddressResponse';

type GetMapsLocationVariables = {
    kakaoRestApiKey: string;
    longitude: number;
    latitude: number;
};

export const API_GET_LOCATION_ADDRESS_KEY = '/v2/local/geo/coord2address.json';

const getLocationAddress = async ({
    kakaoRestApiKey,
    longitude,
    latitude,
}: GetMapsLocationVariables) => {
    const { data } = await kakaoRequset.get<LocationAddressResponse>(API_GET_LOCATION_ADDRESS_KEY, {
        headers: { authorization: `KakaoAK ${kakaoRestApiKey}` },
        params: {
            x: longitude,
            y: latitude,
        },
    });
    return data;
};

export default getLocationAddress;
