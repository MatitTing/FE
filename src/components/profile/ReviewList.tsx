import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { useSearchParam } from 'react-use';
import ProfileTabSortingButton from './ProfileTabSortingButton';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import getReviewList, {
    API_GET_REVIEW_LIST_KEY,
    ReviewListRequestType,
} from 'src/api/getReviewList';
import { useSuspenseQuery } from '@tanstack/react-query';

interface ReviewListProps {}
type ReviewListType = '보낸리뷰' | '받은리뷰';

interface CategoryItemType {
    id: ReviewListRequestType;
    label: ReviewListType;
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

const ReviewListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 16px;
    overflow: auto;
`;

function isReviewListRole(value: unknown): value is ReviewListRequestType {
    return value === 'SENDER' || value === 'RECEIVER';
}

const ReviewList: FC<ReviewListProps> = () => {
    const { query, replace } = useRouter();
    const reviewRole = useSearchParam('role');
    const selectedRole = useMemo(() => {
        if (!reviewRole || !isReviewListRole(reviewRole)) {
            return;
        }
        return reviewRole;
    }, [reviewRole]);

    // const reviewData = useSuspenseQuery({
    //     queryKey: [API_GET_REVIEW_LIST_KEY, { role: selectedRole }],
    //     queryFn: () => getReviewList({ reviewType: selectedRole ?? 'RECEIVER' }),
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

            <ReviewListContainer>
                {/* <QuerySuspenseErrorBoundary> */}
                <div>ssss</div>
                {/* <ReviewListItemList role={selectedRole || 'HOST'} /> */}
                {/* </QuerySuspenseErrorBoundary> */}
            </ReviewListContainer>
        </Container>
    );
};

export default ReviewList;
