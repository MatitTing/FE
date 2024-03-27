import styled from '@emotion/styled';
import { DefaultButton } from '@components/common/DefaultButton';
import { MouseEventHandler } from 'react';

interface ProfileTabSortingButtonProps {
    text: string;
    filled: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const ProfileTabSortingButton = ({ text, filled, onClick }: ProfileTabSortingButtonProps) => {
    return <DefaultButton text={text} buttonType="toggle" filled={filled} onClick={onClick} />;
};

export default ProfileTabSortingButton;
