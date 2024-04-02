import ImageInput from '@components/common/ImageInput';
import styled from '@emotion/styled';
import { FC } from 'react';

interface ReviewAddImageInputProps {}

const Container = styled.div``;

const ReviewAddImageInput: FC<ReviewAddImageInputProps> = () => (
    <Container>
        <ImageInput />
    </Container>
);

export default ReviewAddImageInput;
