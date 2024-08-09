import { ChangeEventHandler } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

const ImageBox = styled.div`
    position: relative;
    width: 100%;
    height: 150px;
    overflow: hidden;

    img {
        object-fit: cover;
        object-position: center;
    }
`;

const ImageAddBtn = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 1rem;
    background-color: orange;
    color: #fff;
`;

interface ThumbnailProps {
    onChangeThumbnail: ChangeEventHandler<HTMLInputElement>;
}

const Thumbnail = ({ onChangeThumbnail }: ThumbnailProps) => {
    const { getValues } = useFormContext();
    const thumbnail = getValues('thumbnail');

    return (
        <div>
            <ImageBox>
                {thumbnail ? (
                    <Image src={thumbnail} alt="식당 썸네일" fill />
                ) : (
                    <Image src="/images/default_thumbnail.jpg" alt="기본 썸네일" fill />
                )}
            </ImageBox>
            <ImageAddBtn htmlFor="input-file">+ 이미지 첨부</ImageAddBtn>
            <input id="input-file" name="image" type="file" hidden onChange={onChangeThumbnail} />
        </div>
    );
};

export default Thumbnail;
