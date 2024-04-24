import variableAssignMent from '@utils/variableAssignment';
import defaultRequest from 'src/lib/axios/defaultRequest';
import { PartyJoinResponse } from 'types/party/join/PartyJoinResponse';

export type GetPartyJoinRequestRole = 'HOST' | 'VOLUNTEER';
interface getPartyJoinParameter {
    page: number;
    size: number;
    sort: string;
    role: GetPartyJoinRequestRole;
}

export const API_GET_PARTY_JOIN_KEY = '/api/party/party-join';

const getPartyJoin = async (params: getPartyJoinParameter) => {
    const { data } = await defaultRequest.get<
        InfinitePaginationDataType<'partyList', PartyJoinResponse>
    >(API_GET_PARTY_JOIN_KEY, {
        params: {
            ...params,
        },
    });
    return data;
};

export default getPartyJoin;
