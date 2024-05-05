import defaultRequest from 'src/lib/axios/defaultRequest';
import { InfinitePaginationDataType } from 'types/common/InfinitePaginationDataType';
import { GetPartyCurrentSituationResponse } from 'types/party';

type GetPartyCurrentSituationRequestRole = 'HOST' | 'VOLUNTEER';
export type GetPartyCurrentSituationRequestStatus = 'RECRUIT' | 'RECRUIT_FINISH' | 'PARTY_FINISH';
interface GetPartyCurrentSituationParameter {
    page: number;
    size: number;
    role: GetPartyCurrentSituationRequestRole;
    status: GetPartyCurrentSituationRequestStatus;
}

export const API_GET_PARTY_STATUS_KEY = '/api/party/party-status';

const getPartyStatus = async (params: GetPartyCurrentSituationParameter) => {
    const { data } = await defaultRequest.get<
        InfinitePaginationDataType<'partyList', GetPartyCurrentSituationResponse>
    >(API_GET_PARTY_STATUS_KEY, {
        params,
    });
    return data;
};

export default getPartyStatus;
