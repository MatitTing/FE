import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useSearchParam } from 'react-use';
import PartySituation from './party/status/PartySituation';
import TabComponent from './TabComponent';
import PartyRequest from './party/request/PartyRequest';
import ReviewList from './review/ProfileReview';
import ProfileReviewList from './review/ProfileReview';

interface CategoryItemType {
    id: CategoryIdType;
    label: CategoryLabelType;
}

export type CategoryIdType = 'situation' | 'request' | 'review';
export type CategoryLabelType = '파티현황' | '초대요청' | '후기';

const TabContainer = styled.div<{ selectedTabIndex: number }>`
    display: flex;
    position: relative;
    border-bottom: 1px solid #ebebeb;
    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: ${({ selectedTabIndex }) =>
            selectedTabIndex * 100}px; /* 임시 값, 실제로는 계산해야 함 */
        width: 100px; /* 임시 값, 실제로는 계산해야 함 */
        height: 2px;
        background-color: #1976d2;
        transition:
            left 0.3s ease-in-out,
            width 0.3s ease-in-out;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const categoryList: CategoryItemType[] = [
    { id: 'situation', label: '파티현황' },
    { id: 'request', label: '초대요청' },
    { id: 'review', label: '후기' },
];

function isValidCategoryLabelType(value: unknown): value is CategoryIdType {
    return value === 'situation' || value === 'request' || value === 'review';
}

const ProfileTab = () => {
    const { replace } = useRouter();
    const category = useSearchParam('category');
    const selectedId = useMemo(() => {
        if (!category || !isValidCategoryLabelType(category)) {
            return;
        }
        return category;
    }, [category]);

    const selectedTabIndex = useMemo(() => {
        return categoryList.findIndex((category) => category.id === selectedId);
    }, [selectedId]);

    const handleTabClick = (id: CategoryIdType) => {
        if (id === 'review') {
            replace({ query: { category: id, role: 'SENDER' } });
            return;
        }
        replace({ query: { category: id, role: 'VOLUNTEER', status: 'RECRUIT' } });
    };

    return (
        <Wrapper>
            <TabContainer selectedTabIndex={selectedTabIndex}>
                {categoryList.map((category) => {
                    const onClick = () => {
                        handleTabClick(category.id);
                    };
                    return (
                        <TabComponent
                            onClick={onClick}
                            label={category.label}
                            key={category.id}
                            isSelected={selectedId === String(category.id)}
                        />
                    );
                })}
            </TabContainer>
            {selectedId === 'situation' && <PartySituation />}
            {selectedId === 'request' && <PartyRequest />}
            {selectedId === 'review' && <ProfileReviewList />}
        </Wrapper>
    );
};

export default ProfileTab;
