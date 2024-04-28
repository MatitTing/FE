import defaultRequest from 'src/lib/axios/defaultRequest';
import { GetReviewListResponse } from 'types/review';

export type ReviewListRequestType = 'SENDER' | 'RECEIVER';

interface GetReviewListParameter {
    reviewType: ReviewListRequestType;
    page: number;
    size: number;
}

export const API_GET_REVIEW_LIST_KEY = '/api/review';

const getReviewList = async (params: GetReviewListParameter) => {
    const { data } = await defaultRequest.get<
        InfinitePaginationDataType<'reviewGetResList', GetReviewListResponse>
    >(API_GET_REVIEW_LIST_KEY, {
        params,
    });
    return data;
};

export default getReviewList;
