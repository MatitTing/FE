import defaultRequest from 'src/lib/axios/defaultRequest';

export interface DeleteReviewBody {
    reviewId: number;
}

const deleteReview = async (body: DeleteReviewBody) => {
    return defaultRequest.delete('/api/review', {
        data: {
            body,
        },
    });
};

export default deleteReview;
