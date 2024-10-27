import variableAssignMent from '@utils/variableAssignment';
import defaultRequest from 'src/lib/axios/defaultRequest';
import { InfinitePaginationDataType } from 'types/common/InfinitePaginationDataType';
import { PartyJoinResponse } from 'types/party/join/PartyJoinResponse';

type GetPartyJoinRequestRole = 'HOST' | 'VOLUNTEER';
interface GetPartyJoinParameter {
    page: number;
    size: number;
    role: GetPartyJoinRequestRole;
}

export const API_GET_PARTY_JOIN_KEY = '/api/party/party-join';

const getPartyJoin = async (params: GetPartyJoinParameter) => {
    const { data } = await defaultRequest.get<
        InfinitePaginationDataType<'partyList', PartyJoinResponse>
    >(API_GET_PARTY_JOIN_KEY, {
        params,
    });
    return data;
};

export default getPartyJoin;
