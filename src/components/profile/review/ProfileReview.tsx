import { DefaultText } from '@components/common/DefaultText';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';
import { useSearchParam } from 'react-use';
import { ReviewListRequestType } from 'src/api/getReviewList';
import ProfileTabSortingButton from '../ProfileTabSortingButton';
import ProfileReviewItemList from './ProfileReviewItemList';

interface ProfileReviewProps {}
type ProfileReviewType = '보낸리뷰' | '받은리뷰';

interface CategoryItemType {
    id: ReviewListRequestType;
    label: ProfileReviewType;
}

const categoryTab: CategoryItemType[] = [
    { id: 'SENDER', label: '보낸리뷰' },
    { id: 'RECEIVER', label: '받은리뷰' },
];

const LoginRequiredTextWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const TabWrapper = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
`;

const ProfileReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 16px;
    overflow: auto;
`;

function isProfileReviewRole(value: unknown): value is ReviewListRequestType {
    return value === 'SENDER' || value === 'RECEIVER';
}

const ProfileReview: FC<ProfileReviewProps> = () => {
    const { query, replace } = useRouter();
    const reviewRole = useSearchParam('role');
    const selectedRole = useMemo(() => {
        if (!reviewRole || !isProfileReviewRole(reviewRole)) {
            return;
        }
        return reviewRole;
    }, [reviewRole]);

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

            <ProfileReviewContainer>
                <QuerySuspenseErrorBoundary
                    errorFallback={({ error }) => {
                        if (error?.response?.status === 401) {
                            return (
                                <LoginRequiredTextWrapper>
                                    <DefaultText
                                        text="로그인이 필요합니다."
                                        margin="50px 0"
                                        size={15}
                                        weight={700}
                                    />
                                </LoginRequiredTextWrapper>
                            );
                        }
                    }}
                >
                    <ProfileReviewItemList role={selectedRole || 'SENDER'} />
                </QuerySuspenseErrorBoundary>
            </ProfileReviewContainer>
        </Container>
    );
};

export default React.memo(ProfileReview);
