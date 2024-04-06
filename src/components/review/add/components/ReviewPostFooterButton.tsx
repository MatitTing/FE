import { DefaultButton } from '@components/common/DefaultButton';
import styled from '@emotion/styled';
import { FC } from 'react';

interface ReviewPostFooterButtonProps {}

const Container = styled.div`
    /* position: absolute; */
    position: fixed;
    width: 100%;
    padding: 0 30px;
    max-width: 738px;
    bottom: 45px;
`;

const ReviewPostFooterButton: FC<ReviewPostFooterButtonProps> = () => (
    <Container>
        <DefaultButton text="리뷰 제출하기" />
    </Container>
);

export default ReviewPostFooterButton;
