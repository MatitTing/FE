import ReviewDetailController from '@components/review/detail/ReviewDetailController';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';

interface ReviewDetailPageProps {
    id: string;
}

const ReviewDetailPage: NextPage<ReviewDetailPageProps> = ({ id }) => (
    <ReviewDetailController id={id} />
);

export default ReviewDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string };
    if (!id) {
        return { notFound: true };
    }
    return {
        props: { id },
    };
};
