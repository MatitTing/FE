import { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";

const Wrapper = styled.div``;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;
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
  margin-top: -3px;
`;

interface ThumbnailProps {}

const Thumbnail = ({}: ThumbnailProps) => {
  return (
    <Wrapper>
      <ImageBox>
        <Image
          src="https://cdn.pixabay.com/photo/2023/07/20/11/00/cookie-8139062_1280.jpg"
          alt="식당 이미지"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </ImageBox>
      <ImageAddBtn htmlFor="input-file">
        이미지 첨부(이미지는 예시로 적용)
      </ImageAddBtn>
      <input id="input-file" name="image" type="file" hidden />
    </Wrapper>
  );
};

export default Thumbnail;
