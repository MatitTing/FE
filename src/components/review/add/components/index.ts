import styled from '@emotion/styled';
import { ColorToken } from 'styles/Color';

const Layout = styled.div`
    display: flex;
    flex-direction: column;
`;

const IconWrapper = styled.button`
    width: 100%;
`;

const ContentsSection = styled.section`
    display: flex;
    width: 100%;
    max-width: 768px;
    background: ${ColorToken.icon_background};
    /* height: calc(100vh - 45px); */
    padding: 30px;
    flex-direction: column;
`;

export const ReviewAddComponents = {
    Layout,
    IconWrapper,
    ContentsSection,
};
