import { DefaultText } from '@components/common/DefaultText';
import ImageInput, { ImageInputValue } from '@components/common/imageInput/ImageInput';
import ImageInputTile from '@components/common/imageInput/ImageInputTile';
import styled from '@emotion/styled';
import { FC, useState } from 'react';

interface ReviewAddImageInputProps {}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const ImageInputWrapper = styled.div`
    display: flex;
    overflow: auto;
    width: 100%;
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

    const removeImage = (id: string) => {
        const filteredImage = image.filter((image) => image.id !== id);
        setImage(filteredImage);
    };
    return (
        <Container>
            <DefaultText text="사진 첨부" weight={700} size={15} />
            <ImageInputWrapper>
                <ImageInput maxLength={5} onChange={setImage} value={image} />
                <PreviewImageWrapper>
                    {image.map(({ src, id }) => (
                        <ImageInputTile
                            onClick={() => {}}
                            onDeleteButtonClick={() => {
                                removeImage(id);
                            }}
                            src={src}
                            key={id}
                        />
                    ))}
                </PreviewImageWrapper>
            </ImageInputWrapper>
        </Container>
    );
};
export default ReviewAddImageInput;
