import BackIcon from '@components/icons/common/Back.icon';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

interface HeaderBackButtonProps {
    routerPath?: string;
    margin?: string;
}

const Container = styled.div<{ margin: string }>`
    margin: ${({ margin }) => margin};
    height: 24px;
    cursor: pointer;
`;

export const HeaderBackButton = ({ routerPath, margin = '-5px 0 0 0' }: HeaderBackButtonProps) => {
    const router = useRouter();
    const onClickIcon = useCallback(() => {
        if (routerPath) {
            router.push(routerPath);
            return;
        }
        router.back();
    }, [router, routerPath]);

    return (
        <Container margin={margin} onClick={onClickIcon}>
            <BackIcon />
        </Container>
    );
};
