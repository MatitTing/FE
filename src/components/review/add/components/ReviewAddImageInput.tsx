import { DefaultModalContainer } from '@components/common/DefaultModalContainer';
import { DefaultText } from '@components/common/DefaultText';
import ImageInput, { ImageInputValue } from '@components/common/imageInput/ImageInput';
import ImageInputTile from '@components/common/imageInput/ImageInputTile';
import PhotoGallery from '@components/common/PhotoGallery';
import styled from '@emotion/styled';
import { FC, useCallback, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ImageType } from 'types/review';
import { ReviewFormValue } from '../ReviewAddController';

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
    // const [image, setImage] = useState<ImageInputValue[]>([]);
    const { register, setValue, control } = useFormContext<ReviewFormValue>();
    const image = useWatch({ control, name: 'reviewPhotos' });
    const [isOpenImage, setIsOpenImage] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    const removeImage = (id: string) => {
        const filteredImage = image?.filter((image) => image.id !== id);
        setValue('reviewPhotos', filteredImage);
    };

    const onCloseGallery = () => {
        setIsOpenImage(false);
    };

    const getImageSource = useCallback((src: File | string) => {
        if (typeof src === 'string') return src;
        return URL.createObjectURL(src);
    }, []);

    const galleryFormattedImage = image?.map((image) => ({
        id: image.id,
        imageUrl: getImageSource(image.src),
    }));
    const onChangeImageInput = (value: ImageInputValue[]) => {
        setValue('reviewPhotos', value);
    };

    return (
        <Container>
            <DefaultText text="사진 첨부" weight={700} size={15} />
            <ImageInputWrapper>
                <ImageInput maxLength={5} onChange={onChangeImageInput} value={image ?? []} />
                <PreviewImageWrapper>
                    {image?.map(({ src, id }) => (
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
                        imageData={galleryFormattedImage ?? []}
                        onClickCloseIcon={onCloseGallery}
                    />
                </DefaultModalContainer>
            )}
        </Container>
    );
};
export default ReviewAddImageInput;
