import styled from '@emotion/styled';

const Layout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const IconWrapper = styled.button`
    width: 100%;
`;

const ContentsSection = styled.section`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 768px;
    border: 1px solid red;
`;

export const ReviewAddComponents = {
    Layout,
    IconWrapper,
    ContentsSection,
};
