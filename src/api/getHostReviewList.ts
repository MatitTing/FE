import variableAssignment from '@utils/variableAssignment';
import defaultRequest from 'src/lib/axios/defaultRequest';
import { GetReviewListResponse } from 'types/review';

interface GetHostReviewListParameter {
    page: number;
    size: number;
    hostId: number;
}

export const API_GET_HOST_REVIEW_LIST = `/api/review/host`;

export const getHostReviewList = async (params: GetHostReviewListParameter) => {
    const { data } = await defaultRequest.get<
        InfinitePaginationDataType<'reviewGetResList', GetReviewListResponse>
    >(API_GET_HOST_REVIEW_LIST, {
        params,
    });
    return data;
};
