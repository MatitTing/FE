import { NextPage } from 'next';
import { ChangeEvent, useEffect } from 'react';
import styled from '@emotion/styled';
import Create from '@components/party/create/Create';
import SearchMap from '@components/party/create/SearchMap';
import useSearchPlace from '@hooks/useSearchPlace';
import { DefaultHeader } from '@components/common/DefaultHeader';
import { patchParty } from 'src/api/patchParty';
import getPartyDetail, { API_GET_PARTY_DETAIL_KEY } from 'src/api/getPartyDetail';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postUploadImage } from 'src/api/postUploadImage';
import { partySchema } from '../create';
import { PositionSate } from 'src/recoil-states/positionStates';
import { useRecoilValue } from 'recoil';
import { API_GET_MAIN_PAGE } from 'src/api/getPartyMainPage';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    min-height: calc(100vh);
    padding: 45px 0 75px 0;
`;

const CreatePage: NextPage = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { id } = router.query as { id: string };
    const position = useRecoilValue(PositionSate);
    const userId = '0'; // 임시

    const { data } = useQuery({
        queryKey: [API_GET_PARTY_DETAIL_KEY, { id }],
        queryFn: () => getPartyDetail({ id, userId }),
        enabled: !!id,
    });

    const { mutate: updateParty } = useMutation({
        mutationFn: patchParty,
    });

    const { mutate: uploadImage } = useMutation({
        mutationFn: postUploadImage,
    });

    const { marker, keyword, resultList, handleChangeSearchBox, handleClickPlace, setPlace } =
        useSearchPlace();

    const {
        handleSubmit,
        register,
        formState: { isValid },
        setValue,
        getValues,
        reset,
    } = useForm<PartyForm>({
        resolver: yupResolver(partySchema),
        mode: 'onSubmit',
        defaultValues: {
            thumbnail: '/images/default_thumbnail.jpg',
        },
    });

    const onSubmitPartyForm: SubmitHandler<PartyForm> = (formData: PartyForm) => {
        if (!marker || !marker.position) return;

        updateParty(
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
                onSuccess: async () => {
                    await queryClient.invalidateQueries({
                        queryKey: [API_GET_PARTY_DETAIL_KEY, { id, userId }],
                    });
                    await queryClient.invalidateQueries({
                        queryKey: [
                            API_GET_MAIN_PAGE,
                            { latitude: position.coords.x, longitude: position.coords.y },
                        ],
                    });

                    router.replace(`/party/${id}`);
                },
            },
        );
    };

    const handleChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.target;

        if (files) {
            uploadImage(files[0], {
                onSuccess({ imgUrl }) {
                    if (imgUrl) {
                        setValue('thumbnail', imgUrl);
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
        setValue('thumbnail', data?.thumbnail);
    }, [data, setPlace, setValue]);

    const rightHeaderArea = (
        <button type="submit" disabled={!marker?.position.lat || !isValid}>
            완료
        </button>
    );

    if (!data) return <></>;

    return (
        <Form onSubmit={handleSubmit(onSubmitPartyForm)}>
            <DefaultHeader centerArea={`${data?.partyTitle}`} rightArea={rightHeaderArea} />
            <Create
                register={register}
                getValues={getValues}
                onChangeThumbnail={handleChangeThumbnail}
                partyId={data?.partyId}
                defaultData={data}
            >
                <SearchMap
                    marker={marker}
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
