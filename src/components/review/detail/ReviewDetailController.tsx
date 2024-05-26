import { FC } from 'react';
import ReviewDetailScreen from './ReviewDetailScreen';
import { useQuery } from '@tanstack/react-query';
import getReviewDetail, { API_GET_REVIEW_DETAIL } from 'src/api/getReviewDetail';

interface ReviewDetailControllerProps {
    id: string;
}

const ReviewDetailController: FC<ReviewDetailControllerProps> = ({ id }) => {
    // const reviewData = useQuery({
    //     queryKey: [API_GET_REVIEW_DETAIL, { id }],
    //     queryFn: () => getReviewDetail({ reviewId: String(id) }),
    //     enabled: !!id,
    // });

    return <ReviewDetailScreen id={id} />;
};

export default ReviewDetailController;
