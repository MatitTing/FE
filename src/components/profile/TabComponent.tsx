import styled from '@emotion/styled';
import { forwardRef, MouseEventHandler, useRef } from 'react';
import useRipple from '@hooks/useRipple';
import { CategoryIdType } from './ProfileTab';

interface TabComponentProps {
    label: string;
    isSelected: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const Tab = styled.button<{ isSelected: boolean }>`
    border-bottom: ${({ isSelected }) => (isSelected ? '2px solid #1976D2' : 'none')};
    padding: 5px;
    width: 100%;
    max-width: 100px;
    height: 50px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    cursor: pointer;
    color: ${({ isSelected }) => (isSelected ? '#1976D2' : '#7A7A7A')};
    overflow: hidden; /* Prevent ripples from overflowing */
    position: relative;
    border: none;
    background-color: transparent;
`;

const TabComponent = forwardRef<HTMLButtonElement, TabComponentProps>(
    ({ label, isSelected = false, onClick }, forwardedRef) => {
        const internalRef = useRef<HTMLButtonElement>(null);
        const ripples = useRipple(internalRef, '#2196f3');

        return (
            <Tab ref={internalRef} isSelected={isSelected} onClick={onClick}>
                {label}
                {ripples}
            </Tab>
        );
    },
);

TabComponent.displayName = 'TabComponent';
export default TabComponent;
