import styled from '@emotion/styled';
import { FC, MouseEventHandler } from 'react';
import { CategoryType } from './ProfileTab';

interface TabComponentProps {
    label: CategoryType;
    isSelected: boolean;
    onClick: (category: CategoryType) => void;
}

const Container = styled.div<{ isSelected: boolean }>`
    border-bottom: ${({ isSelected }) => (isSelected ? '2px solid #1976D2' : 'none')};
    padding: 10px 15px;
    width: max-content;
    height: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${({ isSelected }) => (isSelected ? '#1976D2' : '#7A7A7A')};
`;
const TabComponent: FC<TabComponentProps> = ({ label, isSelected = false, onClick }) => {
    const onClickTab = (selectedCategory: CategoryType) => {
        const handler = () => {
            onClick(selectedCategory);
        };
        return handler;
    };

    return (
        <Container isSelected={isSelected} onClick={onClickTab(label)}>
            {label}
        </Container>
    );
};

export default TabComponent;
