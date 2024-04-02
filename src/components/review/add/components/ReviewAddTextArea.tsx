import TextArea from '@components/common/TextArea';
import styled from '@emotion/styled';
import { FC } from 'react';

interface ReviewAddTextAreaProps {}

const Container = styled.div`
    margin-top: 30px;
`;

const ReviewAddTextArea: FC<ReviewAddTextAreaProps> = () => (
    <Container>
        <TextArea placeholder="자세한 후기를 남겨 주세요." maxLength={250} />
    </Container>
);

export default ReviewAddTextArea;
