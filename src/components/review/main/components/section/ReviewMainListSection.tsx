import ReviewCard from '@components/common/card/ReviewCard';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import dayjs from 'dayjs';
import { FC } from 'react';
import { GetReviewListResponse, ImageType } from 'types/review';

interface ReviewMainListSectionProps {}

const ReviewMainListSection: FC<ReviewMainListSectionProps> = () => {
    // 랜덤 이미지를 picsum.photos에서 가져오는 함수
    function getRandomImageUrl(): string {
        const width = 800; // 이미지 너비
        const height = 600; // 이미지 높이
        const randomNumber = Math.floor(Math.random() * 1000); // 랜덤 숫자 생성 (picsum.photos는 0부터 999까지의 이미지를 제공)
        return `https://picsum.photos/${width}/${height}?random=${randomNumber}`;
    }

    // 목데이터 생성
    function generateMockReviewList(numReviews: number): GetReviewListResponse[] {
        const mockReviewList: GetReviewListResponse[] = [];

        for (let i = 1; i <= numReviews; i++) {
            const reviewImg: ImageType[] = [];
            const numImages = Math.floor(Math.random() * 5); // 랜덤으로 이미지 개수 생성

            // 랜덤 이미지 추가
            for (let j = 0; j < numImages; j++) {
                reviewImg.push({
                    id: `image_${j}`,
                    imageUrl: getRandomImageUrl(),
                });
            }

            mockReviewList.push({
                reviewId: i,
                userProfileImg: `https://picsum.photos/100/100?random=${i}`, // 프로필 이미지는 각각 다른 이미지로 설정
                nickname: `user${i}`,
                rating: Math.floor(Math.random() * 5) + 1, // 1에서 5까지의 랜덤한 평점 설정
                content: `Review content ${i}`,
                createdAt: dayjs().subtract(i, 'day').format('YYYY-MM-DD'),
                reviewImg: reviewImg,
            });
        }

        return mockReviewList;
    }

    // 목데이터 생성
    const numReviews = 10; // 생성할 리뷰 개수
    const mockReviewList = generateMockReviewList(numReviews);

    return (
        <QuerySuspenseErrorBoundary>
            {mockReviewList.map((review) => (
                <ReviewCard data={review} key={review.reviewId} />
            ))}
        </QuerySuspenseErrorBoundary>
    );
};

export default ReviewMainListSection;
