export type UserGender = 'ALL' | 'MALE' | 'FEMALE' | 'UNKNOWN';

export type OauthProvider = 'KAKAO' | 'NAVER';
export type UserRole = 'GUEST' | 'USER' | 'VOLUNTEER' | 'HOST';

export interface UserProfileResponse {
    userId: number;
    socialId: string;
    oauthProvider: string;
    email: string;
    nickname: string;
    age: number;
    imgUrl: string;
    gender: UserGender;
    role: UserRole;
    rating: number;
    positiveReviewCount: number;
    negativeReviewCount: number;
}
