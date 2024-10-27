import { UserGender } from 'types/profile/user/UserProfileResponse';

export type PartyAge = 'ALL' | 'TWENTY' | 'THIRTY' | 'FORTY';

export interface PartyJoinResponse {
    partyId: number;
    partyTitle: string;
    nickname: string;
    imgUrl: string;
    partyGender: string;
    partyAge: PartyAge;
    userGender: UserGender;
    userAge: number;
    createAt: string;
    oneLineIntroduce: string;
    typeMatch: boolean;
}
