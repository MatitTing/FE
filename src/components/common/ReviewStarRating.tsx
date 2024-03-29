import styled from '@emotion/styled';
import React, { useState } from 'react';
import Star from './Star';

interface ReviewStarRatingProps {
    max?: number;
    size?: number;
    color?: string;
    onSetRate: (rate: number) => void;
    defaultRate?: number;
}

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const StarContainer = styled.div`
    display: flex;
`;

const RateText = styled.p<{ size: number; color: string }>`
    font-size: ${({ size }) => size / 1.5}px;
    margin: 0;
    line-height: 1;
    color: ${({ color }) => color};
`;

const ReviewStarRating: React.FC<ReviewStarRatingProps> = ({
    max = 5,
    size = 30,
    color = '#fcc419',
    onSetRate,
    defaultRate = 0,
}) => {
    const [rate, setRate] = useState(defaultRate);
    const [mouseOverRate, setMouseOverRate] = useState(0);

    const onClick = (selectedRate: number) => {
        setRate(selectedRate);
        onSetRate(selectedRate);
    };

    return (
        <Container>
            <StarContainer>
                {Array.from({ length: max }, (_, i) => (
                    <Star
                        key={i}
                        size={size}
                        color={color}
                        filled={mouseOverRate ? mouseOverRate >= i + 1 : rate >= i + 1}
                        onClick={() => onClick(i + 1)}
                        onMouseEnter={() => setMouseOverRate(i + 1)}
                        onMouseLeave={() => setMouseOverRate(0)}
                    />
                ))}
            </StarContainer>
            <RateText size={size} color={color}>
                {mouseOverRate ? mouseOverRate : rate}
            </RateText>
        </Container>
    );
};

export default ReviewStarRating;
