import defaultRequest from 'src/lib/axios/defaultRequest';
import { GetReviewListResponse } from 'types/review';

export type ReviewListRequestType = 'SENDER' | 'RECEIVER';

interface GetReviewListParameter {
    reviewType: ReviewListRequestType;
}

export const API_GET_REVIEW_LIST_KEY = '/api/review';

const getReviewList = async ({ reviewType }: GetReviewListParameter) => {
    const { data } = await defaultRequest.get<GetReviewListResponse>(API_GET_REVIEW_LIST_KEY, {
        params: {
            reviewType,
        },
    });
    return data;
};

export default getReviewList;
