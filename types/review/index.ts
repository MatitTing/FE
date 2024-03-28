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
    reviewImg: ImageType[];
}
