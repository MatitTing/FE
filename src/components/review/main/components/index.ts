import styled from '@emotion/styled';
import { ColorToken } from 'styles/Color';

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    padding-top: 45px;
`;

const IconWrapper = styled.button`
    width: 100%;
`;

const ContentsSection = styled.section`
    display: flex;
    width: 100%;
    max-width: 768px;
    background: ${ColorToken.icon_background};
    height: 100%;
    overflow: auto;
    padding: 45px 30px 30px 30px;
    flex-direction: column;
    gap: 30px;
`;

export const ReviewMainComponents = {
    Layout,
    IconWrapper,
    ContentsSection,
};
