import { DefaultButton } from '@components/common/DefaultButton';
import styled from '@emotion/styled';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ReviewFormValue } from '../ReviewAddController';

interface ReviewPostFooterButtonProps {
    isEdit: boolean;
}

const Container = styled.div`
    position: fixed;
    width: 100%;
    padding: 0 30px;
    max-width: 738px;
    bottom: 5%;
`;

const ReviewPostFooterButton: FC<ReviewPostFooterButtonProps> = ({ isEdit }) => {
    const { control } = useFormContext<ReviewFormValue>();
    const rating = useWatch({ control, name: 'rating' });
    const reviewComment = useWatch({ control, name: 'reviewComment' });
    return (
        <Container>
            <DefaultButton
                type="submit"
                text={isEdit ? '리뷰 수정하기' : '리뷰 제출하기'}
                disabled={!rating || !reviewComment}
            />
        </Container>
    );
};

export default ReviewPostFooterButton;
