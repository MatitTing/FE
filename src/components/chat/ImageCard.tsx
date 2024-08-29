import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { NewColor } from 'styles/Color';

type ImageType = 'chatUserListprofile' | 'thumbnail' | 'chatProfile';

interface ImageCardProps {
    src: string;
    alt: string;
    imageType: ImageType;
}

const ImageBox = styled.div<{ imageType: ImageType; isURL: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-right: 10px;
    height: auto;
    aspect-ratio: 1/1;

    ${({ imageType, isURL }) =>
        imageType === 'chatProfile'
            ? chatProfileImageStyle
            : imageType === 'thumbnail'
              ? thumbnailImageStyle
              : imageType === 'chatUserListprofile' && isURL
                ? chatUserListUserProfileImageStyle
                : imageType === 'chatUserListprofile' && !isURL
                  ? chatUserListDefaultProfileImageStyle
                  : null}
`;

const chatProfileImageStyle = css`
    width: 30px;
    border-radius: 50%;
    background-color: #fff;
`;

const thumbnailImageStyle = css`
    width: 45px;
    border-radius: 10px;
    border: 1px solid ${NewColor.border};
`;

const chatUserListProfileImageStyle = css`
    position: relative;
    width: 30px;
    border-radius: 50%;
`;

const chatUserListUserProfileImageStyle = css`
    ${chatUserListProfileImageStyle}
    border: 1px solid ${NewColor.border};
`;

const chatUserListDefaultProfileImageStyle = css`
    ${chatUserListProfileImageStyle}
    border: 1px solid ${NewColor.primary};
`;

const ImageCard = ({ imageType, src, alt }: ImageCardProps) => {
    let DEFAULT_IMAGE_PATH = '';

    switch (imageType) {
        case 'chatProfile':
            DEFAULT_IMAGE_PATH = '/images/profile/profile.webp';
            break;
        case 'chatUserListprofile':
            DEFAULT_IMAGE_PATH = '/images/profile/profile_fill.webp';
            break;
        case 'thumbnail':
            DEFAULT_IMAGE_PATH = '/images/default_thumbnail.jpg';
            break;
    }

    return (
        <ImageBox imageType={imageType} isURL={!!src}>
            <Image src={src || DEFAULT_IMAGE_PATH} fill style={{ objectFit: 'cover' }} alt={alt} />
        </ImageBox>
    );
};

export default ImageCard;
