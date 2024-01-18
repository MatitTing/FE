import styled from "@emotion/styled";
import TextInput from "@components/common/TextInput";
import { useRouter } from "next/router";
import Thumbnail from "./Thumbnail";
import { ChangeEvent, PropsWithChildren } from "react";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";

import { PartyForm } from "@pages/party/create";
import SelectContent from "./SelectContent";
import {
  PARTY_AGE_LABEL,
  PARTY_CATEGORY_LABEL,
  PARTY_GENDER_LABEL,
  PARTY_STATUS_LABEL,
  PARTY_TOTAL_LABEL,
} from "src/constants/options";

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

interface CreateProps {
  register: UseFormRegister<PartyForm>;
  onChangeThumbnail: (e: ChangeEvent<HTMLInputElement>) => void;
  getValues: UseFormGetValues<PartyForm>;
}

const Create = ({
  children,
  register,
  getValues,
  onChangeThumbnail,
}: PropsWithChildren<CreateProps>) => {
  const { query: partyId } = useRouter();

  return (
    <Wrapper>
      <TextInput
        name="title"
        placeholder="제목"
        isBorderRadius={false}
        maxLength={20}
        register={{ ...register("title") }}
      />
      <TextArea
        maxLength={100}
        placeholder="내용을 입력하세요."
        rows={5}
        {...register("content")}
      />
      {children}
      <Thumbnail onChangeThumbnail={onChangeThumbnail} getValues={getValues} />
      <SelectContent
        label="성별"
        register={{ ...register("gender") }}
        options={PARTY_GENDER_LABEL}
      />
      <SelectContent
        label="연령"
        register={{ ...register("age") }}
        options={PARTY_AGE_LABEL}
      />
      <SelectContent
        label="종류"
        register={{ ...register("category") }}
        options={PARTY_CATEGORY_LABEL}
      />
      <SelectContent
        label="모집원"
        register={{ ...register("totalParticipant") }}
        options={PARTY_TOTAL_LABEL}
      />
      <Contents>
        <Label>모집일</Label>
        <input type="date" {...register("partyTime")} />
      </Contents>
      {partyId ? (
        <SelectContent
          label="모집 상태"
          register={{ ...register("status") }}
          options={PARTY_STATUS_LABEL}
        />
      ) : null}
    </Wrapper>
  );
};

export default Create;
