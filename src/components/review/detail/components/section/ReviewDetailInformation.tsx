import styled from '@emotion/styled';
import { FC, useCallback, useMemo } from 'react';
import { DefaultText } from '@components/common/DefaultText';
import Image from 'next/image';
import dayjs from 'dayjs';
import Star from '@components/common/Star';
import { ColorToken } from 'styles/Color';
import ReviewDetailImage from './ReviewDetailImage';
import { useSuspenseQuery } from '@tanstack/react-query';
import getReviewDetail, { API_GET_REVIEW_DETAIL } from 'src/api/getReviewDetail';
import ReviewStarRating from '@components/common/ReviewStarRating';

interface ReviewDetailInformationProps {
    id: string;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const ReviewerProfileSection = styled.section`
    display: flex;
    width: 100%;
    height: 100px;
    gap: 30px;
`;
const ReviewerName = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ReviewRatingSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 30px 0;
`;
const RatingInformation = styled.div`
    margin: 15px 0;
    display: flex;
    align-items: flex-end;
`;

const SectionTitle = styled.h1``;

const ReviewTextSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;
`;

const ReviewText = styled.div`
    background: beige;
    padding: 30px;
    border-radius: 15px;
`;

const ReviewImageSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const ReviewDetailInformation: FC<ReviewDetailInformationProps> = ({ id }) => {
    const reviewDetailQuery = useSuspenseQuery({
        queryKey: [API_GET_REVIEW_DETAIL, { id }],
        queryFn: () => getReviewDetail({ reviewId: String(id) }),
    });
    const getReviewText = useCallback((rating: number) => {
        switch (rating) {
            case 5:
                return '정말 좋았어요.';
            case 4:
                return '좋았어요.';
            case 3:
                return '보통이에요.';
            case 2:
                return '별로였어요.';
            default:
                return '최악이에요.';
        }
    }, []);

    const reviewImage = useMemo(() => {
        return reviewDetailQuery.data.reviewImg.map((imageUrl) => ({
            id: crypto.randomUUID(),
            imageUrl,
        }));
    }, [reviewDetailQuery.data.reviewImg]);

    return (
        <Container>
            <ReviewerProfileSection>
                <Image
                    src={reviewDetailQuery.data.profileImage ?? '/images/profile/profile.png'}
                    width={100}
                    height={100}
                    style={{
                        borderRadius: '25%',
                    }}
                    loading="eager"
                    alt="리뷰어 이미지"
                />
                <ReviewerName>
                    <DefaultText text={reviewDetailQuery.data.nickname} size={20} weight={700} />
                </ReviewerName>
            </ReviewerProfileSection>
            <ReviewRatingSection>
                <SectionTitle>
                    <DefaultText text="리뷰 평점" weight={700} size={18} />
                </SectionTitle>
                <RatingInformation>
                    <ReviewStarRating defaultRate={Number(reviewDetailQuery.data.rating)} />
                    <DefaultText
                        margin="0 0 -1.5px 5px"
                        ellipsis
                        size={15}
                        text={dayjs().format('YYYY-MM-DD')}
                    />
                </RatingInformation>
                <DefaultText
                    text={getReviewText(Number(reviewDetailQuery.data.rating))}
                    size={17}
                />
            </ReviewRatingSection>
            <ReviewTextSection>
                <SectionTitle>
                    <DefaultText text="후기" weight={700} size={18} />
                </SectionTitle>
                <ReviewText>
                    <DefaultText text={reviewDetailQuery.data.content} />
                </ReviewText>
            </ReviewTextSection>
            {reviewDetailQuery.data.reviewImg.length > 0 && (
                <ReviewImageSection>
                    <SectionTitle>
                        <DefaultText text="후기 사진" weight={700} size={18} />
                    </SectionTitle>
                    <ReviewDetailImage reviewImages={reviewImage} />
                </ReviewImageSection>
            )}
        </Container>
    );
};

export default ReviewDetailInformation;
