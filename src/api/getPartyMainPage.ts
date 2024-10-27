import variableAssignMent from '@utils/variableAssignment';
import defaultRequest from 'src/lib/axios/defaultRequest';
import { PartyListResponse } from 'types/common/PartyListResponse';

interface GetMainPageParameter {
    longitude: number;
    latitude: number;
    page?: number;
    size?: number;
}

export const API_GET_MAIN_PAGE = '/api/main';

const getMainPageData = async (params: GetMainPageParameter) => {
    const { data } = await defaultRequest.get<
        InfinitePaginationDataType<'partyList', PartyListResponse>
    >(API_GET_MAIN_PAGE, {
        params,
    });
    return data;
};

export default getMainPageData;
