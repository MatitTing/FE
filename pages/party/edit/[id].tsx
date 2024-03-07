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
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postUploadImage } from "src/api/postUploadImage";
import { partySchema } from "../create";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 72px - 45px);
`;

const CreatePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data } = useQuery({
    queryKey: [API_GET_PARTY_DETAIL_KEY, { id }],
    queryFn: () => getPartyDetail({ id }),
    enabled: !!id,
  });

  const { mutate: UpdateParty } = useMutation({
    mutationFn: postPartyUpdate,
  });

  const { mutate: uploadImage } = useMutation({
    mutationFn: postUploadImage,
  });

  const {
    setMap,
    marker,
    keyword,
    resultList,
    handleChangeSearchBox,
    handleClickPlace,
    setPlace,
  } = useSearchPlace();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    setValue,
    getValues,
    reset,
  } = useForm<PartyForm>({
    resolver: yupResolver(partySchema),
    mode: "onSubmit",
    defaultValues: {
      thumbnail: "/images/default_thumbnail.jpg",
    },
  });

  const onSubmitPartyForm: SubmitHandler<PartyForm> = (formData: PartyForm) => {
    if (!marker || !marker.position) return;

    UpdateParty(
      {
        id,
        params: {
          ...formData,
          partyPlaceName: marker.content,
          latitude: marker.position.lat,
          longitude: marker.position.lng,
        },
      },
      {
        onSuccess: ({ data }) => {
          if (data) {
            router.replace(`/partydetail/${id}`);
          }
        },
      }
    );
  };

  const handleChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;

    if (files) {
      uploadImage(files[0], {
        onSuccess({ imgUrl }) {
          if (imgUrl) {
            setValue("thumbnail", imgUrl);
          }
        },
      });
    }
  };

  useEffect(() => {
    if (!data) return;

    setPlace({
      lat: data?.latitude,
      lng: data?.longitude,
      placeName: data?.partyPlaceName,
    });
    setValue("thumbnail", data?.thumbnail);
  }, [data, setPlace, setValue]);

  const rightHeaderArea = (
    <button type="submit" disabled={!marker?.position.lat || !isValid}>
      완료
    </button>
  );

  if (!data) return <></>;

  return (
    <Form onSubmit={handleSubmit(onSubmitPartyForm)}>
      <DefaultHeader
        centerArea={`${data?.partyTitle}`}
        rightArea={rightHeaderArea}
      />
      <Create
        register={register}
        getValues={getValues}
        onChangeThumbnail={handleChangeThumbnail}
        partyId={data?.partyId}
        defaultData={data}
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
