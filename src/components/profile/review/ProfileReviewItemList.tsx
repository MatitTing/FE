import ReviewCard from '@components/common/card/ReviewCard';
import { DefaultText } from '@components/common/DefaultText';
import { ObserverTrigger } from '@components/hoc/ObserverTrigger';
import styled from '@emotion/styled';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { FC } from 'react';
import getReviewList, {
    API_GET_REVIEW_LIST_KEY,
    ReviewListRequestType,
} from 'src/api/getReviewList';

interface ProfileReviewItemListProps {
    role: ReviewListRequestType;
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
`;

const ProfileReviewItemList: FC<ProfileReviewItemListProps> = ({ role }) => {
    const reviewList = useSuspenseInfiniteQuery({
        queryKey: [API_GET_REVIEW_LIST_KEY, , { role }],
        queryFn: ({ pageParam = 0 }) =>
            getReviewList({
                page: pageParam,
                reviewType: role,
                size: 5,
            }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage?.pageInfo?.page,
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

export default ProfileReviewItemList;
