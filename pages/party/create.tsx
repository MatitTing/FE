import { NextPage } from "next";
import { useRef } from "react";
import styled from "@emotion/styled";
import Create from "@components/party/create/Create";
import SearchMap from "@components/party/create/SearchMap";
import useSearchPlace from "@hooks/useSearchPlace";
import { DefaultHeader } from "@components/common/DefaultHeader";
import useSetParty from "src/api/setParty";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import router from "next/router";

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 72px - 45px);
`;

const SubmitBtn = styled.button``;

const schema = yup.object({
  title: yup.string().min(2, "2자 이상 입력해주세요").required(),
  content: yup.string().required(),
  partyTime: yup.string().required(),
  gender: yup.string().required(),
  category: yup.string().required(),
  age: yup.string().required(),
  menu: yup.string(),
  thumbnail: yup.string(),
  totalParticipant: yup.number().required(),
  status: yup.string(),
});

export interface PartyForm {
  title: string;
  content: string;
  partyTime: string;
  gender: string;
  category: string;
  age: string;
  menu: string | undefined;
  thumbnail: string | undefined;
  totalParticipant: number;
  status: string | undefined;
}

const CreatePage: NextPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate: setParty } = useSetParty();
  const {
    marker,
    setMap,
    keyword,
    resultList,
    reset,
    handleChangeSearchBox,
    handleClickPlace,
  } = useSearchPlace();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    setValue,
    getValues,
  } = useForm<PartyForm>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      thumbnail:
        "https://cdn.pixabay.com/photo/2023/07/20/11/00/cookie-8139062_1280.jpg",
    },
  });

  const onSubmitPartyForm: SubmitHandler<PartyForm> = (formData: PartyForm) => {
    if (marker?.position) {
      setParty(
        {
          ...formData,
          latitude: marker?.position.lat,
          longitude: marker?.position.lng,
        },
        {
          onSuccess: ({ data }) => {
            if (data) {
              router.replace(`/party/${data.partyId}`);
            }
          },
        }
      );
    }
  };

  const onClickSubmitButton = () =>
    formRef?.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );

  const rightHeaderArea = (
    <SubmitBtn
      type="button"
      onClick={() => onClickSubmitButton()}
      disabled={marker?.position.lat === undefined || !isValid}
    >
      완료
    </SubmitBtn>
  );

  const onInvalid = (errors: any) => console.error(errors);

  return (
    <Wrapper
      ref={formRef}
      onSubmit={handleSubmit(onSubmitPartyForm, onInvalid)}
    >
      <DefaultHeader centerArea="파티 생성" rightArea={rightHeaderArea} />
      <Create register={register} setValue={setValue} getValues={getValues}>
        <SearchMap
          marker={marker}
          setMap={setMap}
          resultList={resultList}
          keyword={keyword}
          reset={reset}
          handleChangeSearchBox={handleChangeSearchBox}
          handleClickPlace={handleClickPlace}
        />
      </Create>
    </Wrapper>
  );
};

export default CreatePage;
