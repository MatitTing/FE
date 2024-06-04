import ReviewMainController from '@components/review/main/ReviewMainController';
import { GetServerSideProps, NextPage } from 'next';

interface ReviewPageProps {
    hostId: string;
}

const ReviewPage: NextPage<ReviewPageProps> = ({ hostId }) => (
    <ReviewMainController hostId={hostId} />
);

export default ReviewPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { hostId } = context.query;
    if (!hostId) {
        return {
            redirect: {
                permanent: false,
                destination: '404',
            },
        };
    }
    return {
        props: {
            hostId,
        },
    };
};
