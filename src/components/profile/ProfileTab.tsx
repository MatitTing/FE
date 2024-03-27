import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PartySituation from './PartySituation';
import styled from '@emotion/styled';
import PartyRequestList from './PartyRequestList';
import { useState, SyntheticEvent, useMemo } from 'react';
import { useRouter } from 'next/router';
import ProfileTabPanel from './ProfileTabPanel';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import getProfile, { API_GET_PROFILE_KEY } from 'src/api/getProfile';
import TabComponent from './TabComponent';
import { useSearchParam } from 'react-use';

interface CategoryItemType {
    id: string;
    label: CategoryType;
}
export type CategoryType = '파티현황' | '초대요청' | '후기';

const TabContainer = styled.div<{ selectedTabIndex: number }>`
    display: flex;
    position: relative;
    /* gap: 30px; */
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

export default function ProfileTab() {
    const { replace } = useRouter();
    const category = useSearchParam('category');
    const selectedLabel = useMemo(() => {
        if (!category) {
            return;
        }
        return category;
    }, [category]);

    const selectedTabIndex = useMemo(() => {
        return categoryList.findIndex((category) => category.label === selectedLabel);
    }, [selectedLabel]);

    const handleTabClick = (label: CategoryType) => {
        replace({ query: { category: label, situationRole: 'HOST' } });
    };

    return (
        <Wrapper>
            <TabContainer selectedTabIndex={selectedTabIndex}>
                {categoryList.map((category, index) => (
                    <TabComponent
                        onClick={(label) => handleTabClick(label)} // 클릭 핸들러에 인덱스 전달
                        label={category.label}
                        key={category.id}
                        isSelected={selectedLabel === category.label}
                    />
                ))}
            </TabContainer>
            {selectedLabel === '파티현황' && <PartySituation />}
            {/* {selectedLabel === '초대요청' && <PartyRequestList />} */}
        </Wrapper>
    );
}
