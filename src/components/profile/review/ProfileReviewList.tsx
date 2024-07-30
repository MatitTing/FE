import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { useSearchParam } from 'react-use';
import ProfileTabSortingButton from '../ProfileTabSortingButton';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProfileReviewListRequestType } from 'src/api/getProfileReviewList';
import ProfileReviewCard from '../../common/card/ReviewCard';
import { GetReviewListResponse, ImageType } from 'types/review';
import dayjs from 'dayjs';
import React from 'react';
import { useModalContext } from '@mantine/core/lib/components/Modal/Modal.context';
import ReviewCard from '../../common/card/ReviewCard';

interface ProfileReviewListProps {}
type ProfileReviewListType = '보낸리뷰' | '받은리뷰';

interface CategoryItemType {
    id: ProfileReviewListRequestType;
    label: ProfileReviewListType;
}

const categoryTab: CategoryItemType[] = [
    { id: 'SENDER', label: '보낸리뷰' },
    { id: 'RECEIVER', label: '받은리뷰' },
];

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const TabWrapper = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
`;

const ProfileReviewListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 16px;
    overflow: auto;
`;

function isProfileReviewListRole(value: unknown): value is ProfileReviewListRequestType {
    return value === 'SENDER' || value === 'RECEIVER';
}

const ProfileReviewList: FC<ProfileReviewListProps> = () => {
    const { query, replace } = useRouter();
    const reviewRole = useSearchParam('role');
    const selectedRole = useMemo(() => {
        if (!reviewRole || !isProfileReviewListRole(reviewRole)) {
            return;
        }
        return reviewRole;
    }, [reviewRole]);

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

    // const reviewData = useSuspenseQuery({
    //     queryKey: [API_GET_REVIEW_LIST_KEY, { role: selectedRole }],
    //     queryFn: () => getProfileReviewList({ reviewType: selectedRole ?? 'RECEIVER' }),
    // });

    // console.log(reviewData);

    return (
        <Container>
            <TabWrapper>
                {categoryTab.map((tab) => {
                    const onClick = () => {
                        replace({ query: { ...query, role: tab.id } });
                    };

                    return (
                        <ProfileTabSortingButton
                            key={tab.id}
                            text={tab.label}
                            filled={tab.id === selectedRole}
                            onClick={onClick}
                        />
                    );
                })}
            </TabWrapper>

            <ProfileReviewListContainer>
                {/* <QuerySuspenseErrorBoundary> */}

                {mockReviewList.map((review) => (
                    <ReviewCard data={review} key={review.reviewId} />
                ))}
                {/* <ProfileReviewListItemList role={selectedRole || 'HOST'} /> */}
                {/* </QuerySuspenseErrorBoundary> */}
            </ProfileReviewListContainer>
        </Container>
    );
};

export default React.memo(ProfileReviewList);
