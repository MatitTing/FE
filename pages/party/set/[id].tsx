import { NextPage } from "next";
import { ChangeEvent, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Create from "@components/party/create/Create";
import SearchMap from "@components/party/create/SearchMap";
import useSearchPlace from "@hooks/useSearchPlace";
import { DefaultHeader } from "@components/common/DefaultHeader";
import { postPartyUpdate } from "src/api/postParty";
import getPartyDetail, {
  API_GET_PARTY_DETAIL_KEY,
} from "src/api/getPartyDetail";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import router, { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postUploadImage } from "src/api/postUploadImage";

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
  thumbnail: yup.string().required(),
  totalParticipant: yup.number().required(),
  status: yup.string().required(),
});

export interface PartyForm {
  title: string;
  content: string;
  partyTime: string;
  totalParticipant: number;
  gender: string;
  category: string;
  age: string;
  thumbnail: string;
  status: string;
}

const CreatePage: NextPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: [API_GET_PARTY_DETAIL_KEY, { id }],
    queryFn: () => getPartyDetail({ id }),
    enabled: !!id,
  });

  const { mutate: setParty } = useMutation({
    mutationFn: postPartyUpdate,
  });

  const { mutate: setImage } = useMutation({
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
      title: data?.partyTitle,
      content: data?.partyContent,
      gender: data?.gender,
      age: data?.age,
      category: data?.category,
      totalParticipant: data?.totalParticipate || 1,
      partyTime:
        data?.partyTime.split("T")[0] ||
        new Date().toISOString().substring(0, 10),
      thumbnail: data?.thumbnail || "/images/default_thumbnail.jpg",
      status: data?.status || "모집중",
    },
  });

  console.log(data?.partyTime.split("T")[0]);

  const onSubmitPartyForm: SubmitHandler<PartyForm> = (formData: PartyForm) => {
    if (!marker || !marker.position) return;

    setParty(
      {
        id,
        params: {
          ...formData,
          latitude: marker.position.lat,
          longitude: marker.position.lng,
        },
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

  const rightHeaderArea = (
    <SubmitBtn type="submit" disabled={!marker?.position.lat || !isValid}>
      완료
    </SubmitBtn>
  );

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

  useEffect(() => {
    if (id) {
      //  식당의 상호명과 좌표값으로 지도 세팅
    }
  }, [id, setMap]);

  if (!data) return <></>;

  return (
    <Form ref={formRef} onSubmit={handleSubmit(onSubmitPartyForm)}>
      <DefaultHeader
        centerArea={`${data?.partyTitle}`}
        rightArea={rightHeaderArea}
      />
      <Create
        register={register}
        getValues={getValues}
        onChangeThumbnail={handleChangeThumbnail}
        partyId={data?.partyId}
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
