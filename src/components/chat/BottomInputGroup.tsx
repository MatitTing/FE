import { ChangeEvent, MouseEvent, ReactElement } from "react";
import TextInput from "@components/common/TextInput";
import styled from "@emotion/styled";

const Wrapper = styled.div({
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  padding: "1rem 2rem",
  backgroundColor: "#ddd",

  "& input": {
    height: "50px",
  },
});

const ImageUploadButton = styled.label({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#efebec",
  cursor: "pointer",
});

const SubmitButton = styled.button({
  width: "50px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#efebec",
});

const BottomInputGroup = () => {
  const handleClickSubmit = (e: MouseEvent<HTMLButtonElement>) => {};

  const handleChangeImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <TextInput placeholder="message" />
      <ImageUploadButton aria-label="upload picture" htmlFor="add_image">
        +
      </ImageUploadButton>
      <input
        hidden
        id="add_image"
        type="file"
        accept=".jpeg,.png"
        onChange={handleChangeImageFile}
      />
      <SubmitButton onClick={handleClickSubmit}>전송</SubmitButton>
    </Wrapper>
  );
};

BottomInputGroup.getLayout = (page: ReactElement) => {
  return <>{page}</>;
};

export default BottomInputGroup;
