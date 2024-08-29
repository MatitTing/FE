import { ChangeEventHandler } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { NewColor } from 'styles/Color';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Container, Title } from '../FormStyle';

const ImageBox = styled.div`
    position: relative;
    margin-bottom: 8px;
    width: 20%;
    aspect-ratio: 4/3;
    border: 1px solid ${NewColor.border};
    border-radius: 5px;
    overflow: hidden;

    img {
        object-fit: cover;
        object-position: center;
    }
`;

const ImageAdd = styled.label<{ isthumbnail: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${({ isthumbnail }) => (isthumbnail ? ' rgba(000, 000, 000, 0.3)' : '#fff')};
    z-index: 99;
    padding: 5px;
    width: 100%;
    height: 100%;
    cursor: pointer;

    svg {
        color: ${({ isthumbnail }) => (isthumbnail ? '#fff' : NewColor.border)};
    }
`;

interface PartyThumbnailProps {
    onChangeThumbnail: ChangeEventHandler<HTMLInputElement>;
}

const PartyThumbnail = ({ onChangeThumbnail }: PartyThumbnailProps) => {
    const { getValues } = useFormContext();
    const thumbnail = getValues('thumbnail');

    return (
        <Container>
            <Title>대표 이미지</Title>
            <ImageBox>
                <ImageAdd htmlFor="input-file" isthumbnail={thumbnail}>
                    <AddCircleOutlineIcon />
                </ImageAdd>
                <input
                    id="input-file"
                    name="image"
                    type="file"
                    hidden
                    onChange={onChangeThumbnail}
                />
                {thumbnail ? <Image src={thumbnail} alt="식당 썸네일" fill /> : null}
            </ImageBox>
        </Container>
    );
};

export default PartyThumbnail;
