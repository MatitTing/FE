import defaultRequest from 'src/lib/axios/defaultRequest';

export type PostPartyDecisionStatus = 'ACCEPT' | 'REFUSE';

interface PostPartyParticipationParameter {
    partyId: number;
    nickname: string;
    status: PostPartyDecisionStatus;
}

export const API_POST_PARTY_DECISION_KEY = '/api/party/decision';

const postPartyDecision = async (body: PostPartyParticipationParameter) => {
    return defaultRequest.post(API_POST_PARTY_DECISION_KEY, body);
};

export default postPartyDecision;
