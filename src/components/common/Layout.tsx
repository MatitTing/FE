import BottomBar from './BottomBar';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ReactNode, useMemo } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Container = styled.div<{ isVisibleBottom: boolean }>`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    main {
        flex: 1;
        overflow: auto;
    }
`;

const BottomSection = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
`;

function Layout({ children }: LayoutProps) {
    const router = useRouter();
    const isVisibleBottom = useMemo(() => {
        return ['/', '/search', '/profile', '/party/create', '/chat/list'].includes(
            router.pathname,
        );
    }, [router.pathname]);

    return (
        <Container isVisibleBottom={isVisibleBottom}>
            <main>{children}</main>
            {isVisibleBottom ? (
                <BottomSection>
                    <BottomBar />
                </BottomSection>
            ) : null}
        </Container>
    );
}

export default Layout;
