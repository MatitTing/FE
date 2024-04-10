import TextArea from '@components/common/TextArea';
import styled from '@emotion/styled';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { ReviewFormValue } from '../ReviewAddController';

interface ReviewAddTextAreaProps {}

const Container = styled.div`
    margin-top: 30px;
`;

const ReviewAddTextArea: FC<ReviewAddTextAreaProps> = () => {
    const { register } = useFormContext<ReviewFormValue>();

    return (
        <Container>
            <TextArea
                {...register('reviewComment')}
                placeholder="자세한 후기를 남겨 주세요."
                maxLength={250}
            />
        </Container>
    );
};

export default ReviewAddTextArea;
