import variableAssignment from '@utils/variableAssignment';
import defaultRequest from 'src/lib/axios/defaultRequest';
import { GetReviewDetailResponse } from 'types/review';

interface GetReviewDetailParameter {
    reviewId: string;
}

export const API_GET_REVIEW_DETAIL = `/api/review/{{reviewId}}`;

const getReviewDetail = async ({ reviewId }: GetReviewDetailParameter) => {
    const { data } = await defaultRequest.get<GetReviewDetailResponse>(
        variableAssignment(API_GET_REVIEW_DETAIL, {
            reviewId,
        }),
    );
    return data;
};

export default getReviewDetail;
