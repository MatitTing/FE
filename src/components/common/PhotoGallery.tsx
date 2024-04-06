import CloseIcon from '@components/icons/common/Close.icon';
import styled from '@emotion/styled';
import { FC, MouseEventHandler, useCallback, useMemo, useState } from 'react';
import { ImageType } from 'types/review';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import React from 'react';
import { DefaultText } from './DefaultText';

interface PhotoGalleryProps {
    onClickCloseIcon: MouseEventHandler<HTMLButtonElement>;
    imageData: ImageType[];
    initialSlideNumber: number;
}

const Container = styled.div`
    background: black;
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
`;

const Header = styled.section`
    display: flex;
    width: 100%;
    height: 50px;
    padding: 10px;
`;

const CloseIconWrapper = styled.button`
    svg {
        fill: white;
    }
`;

const ImageSection = styled.section`
    width: 100%;
    height: 100%;
    border: 1px solid red;
    z-index: 999999999999;
`;
const ImageWrapper = styled.div`
    width: 100%;
    height: calc(100vh - 50px);
`;

const SlideInfo = styled.section`
    width: 100%;
    height: 50px;
    justify-content: center;
    position: absolute;
    bottom: 10%;
    align-items: center;
`;

const SlideSection = styled.section`
    position: relative;
`;

const SlideInfoTextWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
`;

const PhotoGallery: FC<PhotoGalleryProps> = ({
    onClickCloseIcon,
    imageData,
    initialSlideNumber,
}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = useMemo(() => imageData.length, [imageData]);
    const onSlideChangeTransitionEnd = useCallback((instance: SwiperClass) => {
        setCurrentPage(instance.realIndex + 1);
    }, []);

    return (
        <Container>
            <Header>
                <CloseIconWrapper onClick={onClickCloseIcon}>
                    <CloseIcon size={35} color="white" />
                </CloseIconWrapper>
            </Header>

            <SlideSection>
                <Swiper
                    initialSlide={initialSlideNumber}
                    onSlideChangeTransitionEnd={onSlideChangeTransitionEnd}
                >
                    {imageData.map((image) => (
                        <SwiperSlide key={image.id}>
                            <ImageWrapper>
                                <Image
                                    priority
                                    loading="eager"
                                    src={image.imageUrl}
                                    alt="리뷰 이미지"
                                    fill
                                    style={{
                                        objectFit: 'contain',
                                    }}
                                />
                            </ImageWrapper>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <SlideInfo>
                    <SlideInfoTextWrapper>
                        <DefaultText
                            text={`${currentPage} / ${totalPages}`}
                            color="white"
                            weight={700}
                            size={18}
                        />
                    </SlideInfoTextWrapper>
                </SlideInfo>
            </SlideSection>
        </Container>
    );
};

export default React.memo(PhotoGallery);
