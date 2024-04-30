export type ImageType = {
    id: string;
    imageUrl: string;
};

export interface GetReviewListResponse {
    reviewId: number;
    userProfileImg: string;
    nickname: string;
    rating: number;
    content: string;
    reviewImg: string[];
    createdAt: string | Date;
}

export interface GetReviewDetailResponse {
    reviewId: number;
    nickname: string;
    rating: number;
    content: string;
    reviewImg: string[];
    createdAt: string | Date;
    isSelfReview: boolean;
}
