import styled from "@emotion/styled";
import TextInput from "@components/common/TextInput";
import Thumbnail from "./Thumbnail";
import { ChangeEventHandler, FC, PropsWithChildren } from "react";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";
import SelectContent from "./SelectContent";
import {
  PARTY_AGE_LABEL,
  PARTY_CATEGORY_LABEL,
  PARTY_GENDER_LABEL,
  PARTY_STATUS_LABEL,
  PARTY_TOTAL_LABEL,
} from "src/constants/options";
import { PartyDetailResponse } from "types/party/detail/PartyDetailResponse";
import dayjs from "dayjs";

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
  partyId?: number;
  defaultData?: PartyDetailResponse;
  onChangeThumbnail: ChangeEventHandler<HTMLInputElement>;
  register: UseFormRegister<PartyForm>;
  getValues: UseFormGetValues<PartyForm>;
}

const Create: FC<PropsWithChildren<CreateProps>> = ({
  partyId,
  defaultData,
  children,
  register,
  getValues,
  onChangeThumbnail,
}) => (
  <Wrapper>
    <TextInput
      placeholder="제목"
      isBorderRadius={false}
      maxLength={20}
      {...register("partyTitle")}
      defaultValue={defaultData?.partyTitle}
    />
    <TextArea
      maxLength={100}
      placeholder="내용을 입력하세요."
      rows={5}
      {...register("partyContent")}
      defaultValue={defaultData?.partyContent}
    />
    {children}
    <TextInput
      placeholder="메뉴를 입력해주세요."
      isBorderRadius={false}
      maxLength={20}
      {...register("menu")}
      defaultValue={defaultData?.menu}
    />
    <Thumbnail onChangeThumbnail={onChangeThumbnail} getValues={getValues} />
    <SelectContent
      label="성별"
      {...register("gender")}
      options={PARTY_GENDER_LABEL}
      defaultValue={defaultData?.gender}
    />
    <SelectContent
      label="연령"
      {...register("age")}
      options={PARTY_AGE_LABEL}
      defaultValue={defaultData?.age}
    />
    <SelectContent
      label="종류"
      {...register("category")}
      options={PARTY_CATEGORY_LABEL}
      defaultValue={defaultData?.category}
    />
    <SelectContent
      label="모집원"
      {...register("totalParticipant")}
      options={PARTY_TOTAL_LABEL}
      defaultValue={defaultData?.totalParticipant}
    />
    <Contents>
      <Label>모집일</Label>
      <input
        type="datetime-local"
        {...register("partyTime")}
        defaultValue={
          dayjs(defaultData?.partyTime).format("YYYY-MM-DDTHH:mm") || ""
        }
      />
    </Contents>
    {partyId ? (
      <SelectContent
        label="모집 상태"
        {...register("status")}
        options={PARTY_STATUS_LABEL}
        defaultValue={defaultData?.status}
      />
    ) : null}
  </Wrapper>
);

export default Create;
