import { DefaultText } from '@components/common/DefaultText';
import ReviewStarRating from '@components/common/ReviewStarRating';
import styled from '@emotion/styled';
import { FC, useCallback, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ReviewFormValue } from '../ReviewAddController';

interface ReviewAddStarRatingProps {}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    padding-top: 50px;
`;

const ReviewAddStarRating: FC<ReviewAddStarRatingProps> = () => {
    const { setValue, control } = useFormContext<ReviewFormValue>();
    const rating = useWatch<ReviewFormValue>({ control, name: 'rating' });

    const onChangeStar = useCallback(
        (value: number) => {
            setValue('rating', value);
        },
        [setValue],
    );

    return (
        <Container>
            <ReviewStarRating onSetRate={onChangeStar} defaultRate={Number(rating)} />
            <DefaultText text="정말 좋았어요." size={15} />
        </Container>
    );
};

export default ReviewAddStarRating;
