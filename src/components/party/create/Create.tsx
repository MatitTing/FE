import styled from "@emotion/styled";
import TextInput from "@components/common/TextInput";
import CheckBox from "./CheckBox";
import { useRouter } from "next/router";
import Thumbnail from "./Thumbnail";
import { partyAgeInfo, partyGenderInfo } from "./CheckBoxInfo";
import { ReactNode } from "react";

const Wrapper = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const TextArea = styled.textarea`
  display: block;
  padding: 10px 14px;
  width: 100%;
  outline: none;
  border: none;
  resize: none;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
`;

const Contents = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;
  height: 60px;

  & input {
    width: 200px;
  }
`;

const Label = styled.h5`
  min-width: 80px;
`;

const Select = styled.select`
  width: 200px;
  padding: 5px;
`;

interface CreateProps {
  children: ReactNode;
}

const Create = ({ children }: CreateProps) => {
  const { query: partyId } = useRouter();

  return (
    <Wrapper>
      <TextInput
        name="title"
        placeholder="제목"
        isBorderRadius={false}
        maxLength={20}
      />
      <TextArea
        maxLength={100}
        name="descripton"
        placeholder="내용을 입력하세요."
        rows={5}
      />
      {children}
      <Thumbnail />
      <CheckBox title="성별(선택)" contents={partyGenderInfo} />
      <CheckBox title="연령(선택)" contents={partyAgeInfo} />
      <Contents>
        <Label>종류</Label>
        <Select name="category">
          <option value="한식">한식</option>
          <option value="양식">양식</option>
          <option value="일식">일식</option>
          <option value="중식">중식</option>
          <option value="기타">기타</option>
        </Select>
      </Contents>
      <Contents>
        <Label>모집원</Label>
        <Select name="maxMember">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </Select>
      </Contents>
      <Contents>
        <Label>모집일</Label>
        <input type="date" name="date" />
      </Contents>
      {partyId ? (
        <Contents>
          <Label>모집 상태</Label>
          <Select name="maxMember">
            <option value="모집중">모집중</option>
            <option value="모집 중단">모집 중단</option>
          </Select>
        </Contents>
      ) : null}
    </Wrapper>
  );
};

export default Create;
