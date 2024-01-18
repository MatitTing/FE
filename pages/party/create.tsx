import { NextPage } from "next";
import { ChangeEvent, useRef } from "react";
import styled from "@emotion/styled";
import Create from "@components/party/create/Create";
import SearchMap from "@components/party/create/SearchMap";
import useSearchPlace from "@hooks/useSearchPlace";
import { DefaultHeader } from "@components/common/DefaultHeader";
import {
  postParty,
  SetPartyRequestParam,
  SetPartyResponse,
} from "src/api/postParty";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import router from "next/router";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import { postUploadImage, SetImageResponse } from "src/api/postUploadImage";

const Form = styled.form`
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
  menu: yup.string().required(),
  thumbnail: yup.string().required(),
  totalParticipant: yup.number().required(),
  status: yup.string().required(),
});

export interface PartyForm {
  title: string;
  content: string;
  partyTime: string;
  gender: string;
  category: string;
  age: string;
  menu: string;
  thumbnail: string;
  totalParticipant: number;
  status: string;
}

const CreatePage: NextPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate: postPartyCreate } = useMutation<
    AxiosResponse<SetPartyResponse>,
    AxiosError,
    SetPartyRequestParam
  >({
    mutationFn: postParty,
  });
  const { mutate: setImage } = useMutation<SetImageResponse, AxiosError, File>({
    mutationFn: postUploadImage,
  });
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
      menu: "",
      status: "",
      thumbnail: "/images/default_thumbnail.jpg",
    },
  });

  const onSubmitPartyForm: SubmitHandler<PartyForm> = (formData: PartyForm) => {
    if (!marker || !marker.position) return;

    postPartyCreate(
      {
        ...formData,
        latitude: marker.position.lat,
        longitude: marker.position.lng,
      },
      {
        onSuccess: ({ data }) => {
          if (data) {
            router.replace(`/party/${data.partyId}`);
          }
        },
      }
    );
  };

  const onClickSubmitButton = () =>
    formRef?.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );

  const rightHeaderArea = (
    <SubmitBtn
      type="button"
      onClick={onClickSubmitButton}
      disabled={!marker?.position.lat || !isValid}
    >
      완료
    </SubmitBtn>
  );

  const onInvalid = (errors: any) => console.error(errors);

  const handleChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;

    if (files) {
      setImage(files[0], {
        onSuccess({ imgUrl }) {
          if (imgUrl) {
            setValue("thumbnail", imgUrl);
          }
        },
      });
    }
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit(onSubmitPartyForm, onInvalid)}>
      <DefaultHeader centerArea="파티 생성" rightArea={rightHeaderArea} />
      <Create
        register={register}
        getValues={getValues}
        onChangeThumbnail={handleChangeThumbnail}
      >
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
    </Form>
  );
};

export default CreatePage;
