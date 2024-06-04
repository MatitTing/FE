import ReviewCard from '@components/common/card/ReviewCard';
import { DefaultText } from '@components/common/DefaultText';
import { ObserverTrigger } from '@components/hoc/ObserverTrigger';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import styled from '@emotion/styled';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { API_GET_HOST_REVIEW_LIST_KEY, getHostReviewList } from 'src/api/getHostReviewList';
import { GetReviewListResponse, ImageType } from 'types/review';

interface ReviewMainListSectionProps {
    hostId: string;
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
`;

const ReviewMainListSection = ({ hostId }: ReviewMainListSectionProps) => {
    const reviewList = useSuspenseInfiniteQuery({
        queryKey: [API_GET_HOST_REVIEW_LIST_KEY, { hostId: Number(hostId) }],
        queryFn: ({ pageParam = 0 }) =>
            getHostReviewList({
                page: pageParam,
                hostId: Number(hostId),
                size: 5,
            }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (!lastPage?.pageInfo.hasNext) {
                return undefined;
            }
            return lastPage.pageInfo.page + 1;
        },
    });

    const onObserve = () => {
        if (reviewList.hasNextPage) reviewList.fetchNextPage();
    };

    if (!reviewList.data.pages[0].reviewGetResList.length) {
        return (
            <Container>
                <DefaultText text="현재 조회된 리뷰가 없습니다." size={18} weight={700} />
            </Container>
        );
    }

    return (
        <ObserverTrigger onObserve={onObserve} observerMinHeight="30px">
            {reviewList.data.pages.map((review) =>
                review.reviewGetResList.map((individualReview) => (
                    <ReviewCard data={individualReview} key={individualReview.reviewId} />
                )),
            )}
        </ObserverTrigger>
    );
};

export default ReviewMainListSection;
