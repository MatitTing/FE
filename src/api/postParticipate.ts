import defaultRequest from 'src/lib/axios/defaultRequest';

export type PostParticipateStatus = 'APPLY' | 'CANCEL';

interface PostParticipateParameter {
    partyId: number;
    oneLineIntroduce?: string;
    status: PostParticipateStatus;
}

export const API_POST_PARTY_PARTICIPATION_KEY = '/api/party/participation';

const postParticipate = async (body: PostParticipateParameter) => {
    return defaultRequest.post(API_POST_PARTY_PARTICIPATION_KEY, body);
};

export default postParticipate;
