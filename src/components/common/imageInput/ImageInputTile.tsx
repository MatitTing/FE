import CloseIcon from '@components/icons/common/Close.icon';
import styled from '@emotion/styled';
import Image from 'next/image';
import { FC, MouseEventHandler, useMemo } from 'react';
import { ColorToken } from 'styles/Color';

interface ImageInputTileProps {
    src: File | string;
    onClick: MouseEventHandler<HTMLDivElement>;
    onDeleteButtonClick: MouseEventHandler<HTMLDivElement>;
}

const ItemBox = styled.div`
    position: relative;
    width: 90px;
    height: 90px;
    overflow: unset;
`;

const ImageWrapper = styled.div`
    position: relative;
    width: 90px;
    height: 90px;
    border-radius: 15px;
    overflow: hidden;
`;

const DeleteButton = styled.div`
    position: absolute;
    top: -10px;
    right: -2px;
    width: 20px;
    height: 20px;
    background: gray;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const ImageInputTile: FC<ImageInputTileProps> = ({ src, onClick, onDeleteButtonClick }) => {
    const imageSource = useMemo(() => {
        if (typeof src === 'string') return src;
        return URL.createObjectURL(src);
    }, [src]);
    return (
        <ItemBox>
            <ImageWrapper onClick={onClick}>
                <Image src={imageSource} alt="input-image" fill style={{ objectFit: 'cover' }} />
            </ImageWrapper>
            <DeleteButton role="button" onClick={onDeleteButtonClick}>
                <CloseIcon color="#f3f3f3" size={15} />
            </DeleteButton>
        </ItemBox>
    );
};

export default ImageInputTile;
