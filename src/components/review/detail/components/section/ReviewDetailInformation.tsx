import styled from '@emotion/styled';
import { FC } from 'react';
import { DefaultText } from '@components/common/DefaultText';
import Image from 'next/image';
import dayjs from 'dayjs';
import Star from '@components/common/Star';
import { ColorToken } from 'styles/Color';
import ReviewDetailImage from './ReviewDetailImage';

interface ReviewDetailInformationProps {}

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

const ReviewDetailInformation: FC<ReviewDetailInformationProps> = () => (
    <Container>
        <ReviewerProfileSection>
            <Image
                src={'https://picsum.photos/100/100?random=2'}
                width={100}
                height={100}
                style={{
                    borderRadius: '25%',
                }}
                loading="eager"
                alt="리뷰어 이미지"
            />
            <ReviewerName>
                <DefaultText text={'테스트'} size={20} weight={700} />
            </ReviewerName>
        </ReviewerProfileSection>
        <ReviewRatingSection>
            <SectionTitle>
                <DefaultText text="리뷰 평점" weight={700} size={18} />
            </SectionTitle>
            <RatingInformation>
                {Array.from({ length: 5 }).map((star, index) => (
                    <Star color="#fcc419" filled size={25} key={index} />
                ))}
                <DefaultText
                    margin="0 0 -1.5px 5px"
                    ellipsis
                    size={15}
                    text={dayjs().format('YYYY-MM-DD')}
                />
            </RatingInformation>
            <DefaultText text="너무 좋았어요." size={17} />
        </ReviewRatingSection>
        <ReviewTextSection>
            <SectionTitle>
                <DefaultText text="후기" weight={700} size={18} />
            </SectionTitle>
            <ReviewText>
                <DefaultText text="후기작성중입니다." />
            </ReviewText>
        </ReviewTextSection>
        <ReviewImageSection>
            <SectionTitle>
                <DefaultText text="후기 사진" weight={700} size={18} />
            </SectionTitle>
            <ReviewDetailImage
                reviewImages={[
                    { id: crypto.randomUUID(), imageUrl: 'https://picsum.photos/100/100?random=7' },
                    { id: crypto.randomUUID(), imageUrl: 'https://picsum.photos/100/100?random=7' },
                    { id: crypto.randomUUID(), imageUrl: 'https://picsum.photos/100/100?random=7' },
                    { id: crypto.randomUUID(), imageUrl: 'https://picsum.photos/100/100?random=7' },
                    { id: crypto.randomUUID(), imageUrl: 'https://picsum.photos/100/100?random=7' },
                ]}
            />
        </ReviewImageSection>
    </Container>
);

export default ReviewDetailInformation;
