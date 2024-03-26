import styled from '@emotion/styled';
import { DefaultButton } from '@components/common/DefaultButton';
import { MouseEventHandler } from 'react';

interface ProfileTabSortingButtonProps {
    text: string;
    filled: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

// const Container = styled.div`
//   display: flex;
//   background-color: white;
//   padding: 16px;
//   flex-direction: row;
//   gap: 10px;
//   transition: top 0.3s ease;
//   z-index: 9;
// `;

const ProfileTabSortingButton = ({ text, filled, onClick }: ProfileTabSortingButtonProps) => {
    return <DefaultButton text={text} buttonType="toggle" filled={filled} onClick={onClick} />;
};

export default ProfileTabSortingButton;
