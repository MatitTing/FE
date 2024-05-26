import { UserGender } from 'types/profile/user/UserProfileResponse';
import { PartyAge } from './join/PartyJoinResponse';

export type PartyCurrentSituationRequestStatus = 'RECRUIT' | 'RECRUIT_FINISH' | 'PARTY_FINISH';
export type PartyFoodCategory = 'KOREAN' | 'WESTERN' | 'JAPANESE' | 'CHINESE' | 'ETC';

export interface GetPartyCurrentSituationResponse {
    userId: number;
    partyId: number;
    partyTitle: string;
    partyContent: string;
    address: string;
    longitude: number;
    latitude: number;
    partyPlaceName: string;
    status: PartyCurrentSituationRequestStatus;
    gender: UserGender;
    age: PartyAge;
    deadline: string;
    partyTime: string;
    totalParticipate: 4;
    participate: 2;
    menu: string;
    category: PartyFoodCategory;
    thumbnail: string;
    hit: number;
    reviewExist: boolean;
}
