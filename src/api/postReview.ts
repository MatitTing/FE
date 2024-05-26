import defaultRequest from 'src/lib/axios/defaultRequest';

export interface PostReviewBody {
    partyId: number;
    content: string;
    rating: number;
    imgUrl?: string[];
}

const postReview = async (body: PostReviewBody) => {
    return defaultRequest.post('/api/review', body);
};

export default postReview;
