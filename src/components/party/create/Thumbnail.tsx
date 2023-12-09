import { ChangeEventHandler } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { PartyForm } from "@pages/party/create";
import { UseFormGetValues } from "react-hook-form";

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
`;

interface ThumbnailProps {
  onChangeThumbnail: ChangeEventHandler<HTMLInputElement>;
  getValues: UseFormGetValues<PartyForm>;
}

const Thumbnail = ({ onChangeThumbnail, getValues }: ThumbnailProps) => {
  const { thumbnail } = getValues();

  return (
    <div>
      <ImageBox>
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt="식당 썸네일"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        ) : null}
      </ImageBox>
      <ImageAddBtn htmlFor="input-file">+ 이미지 첨부</ImageAddBtn>
      <input
        id="input-file"
        name="image"
        type="file"
        hidden
        onChange={onChangeThumbnail}
      />
    </div>
  );
};

export default Thumbnail;
