import { DefaultModalContainer } from '@components/common/DefaultModalContainer';
import { DefaultText } from '@components/common/DefaultText';
import PhotoGallery from '@components/common/PhotoGallery';
import ReviewStarRating from '@components/common/ReviewStarRating';
import Star from '@components/common/Star';
import DeleteIcon from '@components/icons/common/Delete.icon';
import EditIcon from '@components/icons/common/Edit.icon';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { FC } from 'react';
import { GetReviewListResponse } from 'types/review';

interface ProfileReviewCardProps {
    data: GetReviewListResponse;
}
const Container = styled.div`
    width: 100%;

    border-radius: 20px;
    padding: 15px;
    box-shadow: 5px 5px 5px 5px beige;
`;
const ContentsSection = styled.section`
    display: flex;
    gap: 10px;
`;
const TextInfoSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: calc(100% - 50px);
`;
const NicknameAndDateContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
`;
const ReviewRatingContainer = styled.div`
    display: flex;
    align-items: flex-end;
    width: 100%;
`;

const ReviewTextContainer = styled.div``;
const ReviewMoreContainer = styled.div`
    display: flex;
    justify-content: center;
    cursor: pointer;
`;
const ReviewDateAndEditContainer = styled.div`
    display: flex;
    gap: 5px;
`;

const ReviewImageContainer = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    overflow: auto;
`;

const ProfileReviewCard: FC<ProfileReviewCardProps> = ({ data }) => {
    const { push } = useRouter();
    const [isOpenImage, setIsOpenImage] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const onClickImage = useCallback((index: number) => {
        setSelectedImageIndex(index);
        setIsOpenImage(true);
    }, []);

    const onCloseGallery = useCallback(() => {
        setIsOpenImage(false);
    }, []);

    const onClickReviewDetail = () => {
        push(`/review/${data.reviewId}`);
    };

    return (
        <Container>
            <ContentsSection>
                <Image
                    src={data.userProfileImg}
                    width={50}
                    height={50}
                    style={{
                        borderRadius: '50%',
                    }}
                    loading="eager"
                    alt="리뷰 이미지"
                />
                <TextInfoSection>
                    <NicknameAndDateContainer>
                        <DefaultText
                            text={data.nickname}
                            ellipsis
                            align="center"
                            size={15}
                            weight={700}
                        />
                        <ReviewDateAndEditContainer>
                            <EditIcon />
                            <DeleteIcon />
                        </ReviewDateAndEditContainer>
                    </NicknameAndDateContainer>

                    <ReviewRatingContainer>
                        {Array.from({ length: 5 }).map((star, index) => (
                            <Star color="#fcc419" filled size={15} key={index} />
                        ))}
                        <DefaultText
                            margin="0 0 -1.5px 5px"
                            ellipsis
                            size={11}
                            text={dayjs(data.createdAt).format('YYYY-MM-DD')}
                        />
                    </ReviewRatingContainer>
                    <ReviewTextContainer>
                        <DefaultText text={data.content} size={13} />
                    </ReviewTextContainer>
                    {data.reviewImg.length > 0 ? (
                        <ReviewImageContainer>
                            {data.reviewImg.map((reviewImage, index) => {
                                const handler = () => {
                                    onClickImage(index);
                                };

                                return (
                                    <Image
                                        src={reviewImage.imageUrl}
                                        alt="리뷰 이미지"
                                        key={reviewImage.id}
                                        height={80}
                                        width={80}
                                        style={{
                                            cursor: 'pointer',
                                            borderRadius: '10px',
                                        }}
                                        onClick={handler}
                                    />
                                );
                            })}
                        </ReviewImageContainer>
                    ) : null}
                    <ReviewMoreContainer>
                        <DefaultText
                            onClick={onClickReviewDetail}
                            text={'리뷰 자세히 보기(more)'}
                            size={13}
                        />
                    </ReviewMoreContainer>
                    {isOpenImage && (
                        <DefaultModalContainer>
                            <PhotoGallery
                                initialSlideNumber={selectedImageIndex}
                                imageData={data.reviewImg}
                                onClickCloseIcon={onCloseGallery}
                            />
                        </DefaultModalContainer>
                    )}
                </TextInfoSection>
            </ContentsSection>
        </Container>
    );
};

export default React.memo(ProfileReviewCard);
