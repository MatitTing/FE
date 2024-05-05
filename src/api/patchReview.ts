import defaultRequest from 'src/lib/axios/defaultRequest';

export interface PatchReviewBody {
    reviewId: number;
    content: string;
    rating: number;
    imgUrl?: string[];
}

const patchReview = async (body: PatchReviewBody) => {
    return defaultRequest.patch('/api/review', body);
};

export default patchReview;
