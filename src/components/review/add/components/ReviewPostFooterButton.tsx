import { DefaultButton } from '@components/common/DefaultButton';
import styled from '@emotion/styled';
import { FC } from 'react';

interface ReviewPostFooterButtonProps {}

const Container = styled.div`
    position: relative;
    width: 100%;
    bottom: 45px;
`;

const ReviewPostFooterButton: FC<ReviewPostFooterButtonProps> = () => (
    <Container>
        <DefaultButton text="리뷰 제출하기" />
    </Container>
);

export default ReviewPostFooterButton;
