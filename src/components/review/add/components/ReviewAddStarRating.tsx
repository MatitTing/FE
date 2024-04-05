import { DefaultText } from '@components/common/DefaultText';
import ReviewStarRating from '@components/common/ReviewStarRating';
import styled from '@emotion/styled';
import { FC, useCallback, useState } from 'react';

interface ReviewAddStarRatingProps {}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    padding-top: 50px;
`;

const ReviewAddStarRating: FC<ReviewAddStarRatingProps> = () => {
    const onChangeStar = useCallback((value) => {
        console.log(value);
    }, []);

    return (
        <Container>
            <ReviewStarRating onSetRate={onChangeStar} />
            <DefaultText text="정말 좋았어요." size={15} />
        </Container>
    );
};

export default ReviewAddStarRating;
