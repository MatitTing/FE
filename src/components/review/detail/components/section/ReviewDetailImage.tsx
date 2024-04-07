import { DefaultModalContainer } from '@components/common/DefaultModalContainer';
import PhotoGallery from '@components/common/PhotoGallery';
import styled from '@emotion/styled';
import Image from 'next/image';
import { FC, useCallback, useState } from 'react';
import { ImageType } from 'types/review';

interface ReviewDetailImageProps {
    reviewImages: ImageType[];
}

const ReviewImageContainer = styled.section`
    display: flex;
    gap: 10px;
    width: 100%;
    overflow: auto;
`;

const ReviewDetailImage: FC<ReviewDetailImageProps> = ({ reviewImages }) => {
    const [isOpenImage, setIsOpenImage] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const onClickImage = useCallback((index: number) => {
        setSelectedImageIndex(index);
        setIsOpenImage(true);
    }, []);

    const onCloseGallery = useCallback(() => {
        setIsOpenImage(false);
    }, []);

    return (
        <ReviewImageContainer>
            {reviewImages.map((reviewImage, index) => {
                const handler = () => {
                    onClickImage(index);
                };

                return (
                    <Image
                        src={reviewImage.imageUrl}
                        alt="리뷰 이미지"
                        loading="lazy"
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
            {isOpenImage && (
                <DefaultModalContainer>
                    <PhotoGallery
                        initialSlideNumber={selectedImageIndex}
                        imageData={reviewImages}
                        onClickCloseIcon={onCloseGallery}
                    />
                </DefaultModalContainer>
            )}
        </ReviewImageContainer>
    );
};

export default ReviewDetailImage;
