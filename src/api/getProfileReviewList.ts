import defaultRequest from 'src/lib/axios/defaultRequest';
import { GetReviewListResponse } from 'types/review';

export type ProfileReviewListRequestType = 'SENDER' | 'RECEIVER';

interface GetProfileReviewListParameter {
    reviewType: ProfileReviewListRequestType;
}

export const API_GET_REVIEW_LIST_KEY = '/api/review';

const getProfileReviewList = async ({ reviewType }: GetProfileReviewListParameter) => {
    const { data } = await defaultRequest.get<GetReviewListResponse>(API_GET_REVIEW_LIST_KEY, {
        params: {
            reviewType,
        },
    });
    return data;
};

export default getProfileReviewList;
