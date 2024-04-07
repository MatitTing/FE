import { FC } from 'react';
import ReviewDetailScreen from './ReviewDetailScreen';

interface ReviewDetailControllerProps {
    id: string;
}

const ReviewDetailController: FC<ReviewDetailControllerProps> = ({ id }) => <ReviewDetailScreen />;

export default ReviewDetailController;
