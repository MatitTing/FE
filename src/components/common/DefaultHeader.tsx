import styled from '@emotion/styled';
import { ColorToken } from 'styles/Color';

interface HomeHeaderProps {
    leftArea?: React.ReactNode | string;
    centerArea?: React.ReactNode | string;
    rightArea?: React.ReactNode | string;
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    background: ${ColorToken.white};
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    height: 60px;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    padding: 0 1rem;
`;
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${ColorToken.white};
    width: 100%;
    max-width: 768px;
`;

const LeftSection = styled.div`
    width: 15%;
    display: flex;
    justify-content: flex-start;
`;
const CenterSection = styled.div`
    width: calc(70%);
    display: flex;
    justify-content: center;
    font-weight: 600;
`;

const RightSection = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 15%;
`;

export const DefaultHeader = ({ leftArea, rightArea, centerArea }: HomeHeaderProps) => {
    return (
        <Wrapper>
            <Container>
                <LeftSection>{leftArea}</LeftSection>
                <CenterSection>{centerArea}</CenterSection>
                <RightSection>{rightArea}</RightSection>
            </Container>
        </Wrapper>
    );
};
