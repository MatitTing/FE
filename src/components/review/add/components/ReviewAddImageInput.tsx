import { DefaultModalContainer } from '@components/common/DefaultModalContainer';
import { DefaultText } from '@components/common/DefaultText';
import ImageInput, { ImageInputValue } from '@components/common/imageInput/ImageInput';
import ImageInputTile from '@components/common/imageInput/ImageInputTile';
import PhotoGallery from '@components/common/PhotoGallery';
import styled from '@emotion/styled';
import { FC, useCallback, useState } from 'react';
import { ImageType } from 'types/review';

interface ReviewAddImageInputProps {}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const ImageInputWrapper = styled.div`
    display: flex;
    overflow: auto;
    width: 100vw;
    height: 120px;
`;

const PreviewImageWrapper = styled.div`
    display: flex;
    overflow: auto;
    width: 100%;
    height: 120px;
    overflow: visible;
    padding-top: 15px;
    gap: 15px;
`;

const ReviewAddImageInput: FC<ReviewAddImageInputProps> = () => {
    const [image, setImage] = useState<ImageInputValue[]>([]);
    const [isOpenImage, setIsOpenImage] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    const removeImage = (id: string) => {
        const filteredImage = image.filter((image) => image.id !== id);
        setImage(filteredImage);
    };

    const onCloseGallery = () => {
        setIsOpenImage(false);
    };

    const getImageSource = useCallback((src: File | string) => {
        if (typeof src === 'string') return src;
        return URL.createObjectURL(src);
    }, []);

    const galleryFormattedImage: ImageType[] = image.map((image) => ({
        id: image.id,
        imageUrl: getImageSource(image.src),
    }));

    return (
        <Container>
            <DefaultText text="사진 첨부" weight={700} size={15} />
            <ImageInputWrapper>
                <ImageInput maxLength={5} onChange={setImage} value={image} />
                <PreviewImageWrapper>
                    {image.map(({ src, id }) => (
                        <ImageInputTile
                            onClick={() => {
                                setIsOpenImage(true);
                            }}
                            onDeleteButtonClick={() => {
                                removeImage(id);
                            }}
                            src={src}
                            key={id}
                        />
                    ))}
                </PreviewImageWrapper>
            </ImageInputWrapper>
            {isOpenImage && (
                <DefaultModalContainer>
                    <PhotoGallery
                        initialSlideNumber={selectedImageIndex}
                        imageData={galleryFormattedImage}
                        onClickCloseIcon={onCloseGallery}
                    />
                </DefaultModalContainer>
            )}
        </Container>
    );
};
export default ReviewAddImageInput;
