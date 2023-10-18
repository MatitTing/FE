import styled from "@emotion/styled";
import TextInput from "@components/common/TextInput";
import CheckBox from "./CheckBox";
import { useRouter } from "next/router";
import Thumbnail from "./Thumbnail";
import { partyAgeInfo, partyRecruitInfo } from "./CheckBoxInfo";
import { ReactNode } from "react";

const Wrapper = styled.div({
  height: "100%",
  overflowY: "auto",
});

const TextArea = styled.textarea({
  display: "block",
  padding: "10px 14px",
  width: "100%",
  outline: "none",
  border: "none",
  resize: "none",
  backgroundColor: "#f9f9f9",
  borderTop: "1px solid #ddd",
});

const DateContents = styled.div({
  display: "flex",
  alignItems: "center",
  margin: "0 1rem",
  height: "60px",

  "& input": {
    width: "200px",
  },
});

const DateLabel = styled.h5({
  minWidth: "80px",
});

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

      <DateContents>
        <DateLabel>모집일</DateLabel>
        <input type="date" name="date" />
      </DateContents>

      <CheckBox title="연령(선택)" contents={partyAgeInfo} />
      {partyId ? (
        <CheckBox title="모집 상태" contents={partyRecruitInfo} />
      ) : null}
    </Wrapper>
  );
};

export default Create;
