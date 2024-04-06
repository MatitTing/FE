import { NextPage } from 'next';
import { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import Create from '@components/party/create/Create';
import SearchMap from '@components/party/create/SearchMap';
import useSearchPlace from '@hooks/useSearchPlace';
import { DefaultHeader } from '@components/common/DefaultHeader';
import { postParty } from 'src/api/postParty';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import router from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postUploadImage } from 'src/api/postUploadImage';
import { useRecoilValue } from 'recoil';
import { API_GET_MAIN_PAGE } from 'src/api/getPartyMainPage';
import { PositionSate } from 'src/recoil-states/positionStates';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    min-height: calc(100vh);
    padding: 45px 0 75px 0;
`;

export const partySchema = yup.object({
    partyTitle: yup.string().min(2, '2자 이상 입력해주세요').required(),
    partyContent: yup.string().required(),
    partyTime: yup.string().required(),
    gender: yup.string().required(),
    category: yup.string().required(),
    age: yup.string().required(),
    totalParticipant: yup.number().required(),
    menu: yup.string().required(),
    thumbnail: yup.string(),
    status: yup.string(),
});

const CreatePage: NextPage = () => {
    const queryClient = useQueryClient();
    const position = useRecoilValue(PositionSate);

    const { mutate: postPartyCreate } = useMutation({
        mutationFn: postParty,
    });

    const { mutate: postImage } = useMutation({
        mutationFn: postUploadImage,
    });

    const { marker, setMap, keyword, resultList, reset, handleChangeSearchBox, handleClickPlace } =
        useSearchPlace();

    const {
        handleSubmit,
        register,
        formState: { isValid },
        setValue,
        getValues,
    } = useForm<PartyForm>({
        resolver: yupResolver(partySchema),
        mode: 'onSubmit',
        defaultValues: {
            thumbnail: '/images/default_thumbnail.jpg',
        },
    });

    const onSubmitPartyForm: SubmitHandler<PartyForm> = (formData: PartyForm) => {
        if (!marker || !marker.position) return;

        postPartyCreate(
            {
                ...formData,
                partyPlaceName: marker.content,
                latitude: marker.position.lat,
                longitude: marker.position.lng,
            },
            {
                onSuccess: async ({ data }) => {
                    if (data) {
                        await queryClient.invalidateQueries({
                            queryKey: [
                                API_GET_MAIN_PAGE,
                                { latitude: position.coords.x, longitude: position.coords.y },
                            ],
                        });

                        router.replace(`/partydetail/${data.partyId}`);
                    }
                },
            },
        );
    };

    const rightHeaderArea = (
        <button type="submit" disabled={!marker?.position.lat || !isValid}>
            완료
        </button>
    );

    const handleChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.target;

        if (files) {
            postImage(files[0], {
                onSuccess({ imgUrl }) {
                    if (imgUrl) {
                        setValue('thumbnail', imgUrl);
                    }
                },
            });
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmitPartyForm)}>
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
