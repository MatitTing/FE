import ReviewAddController from '@components/review/add/ReviewAddController';
import { NextPage } from 'next';

interface ReviewEditPageProps {}

const ReviewEditPage: NextPage<ReviewEditPageProps> = () => {
    return <ReviewAddController isEdit />;
};
export default ReviewEditPage;
