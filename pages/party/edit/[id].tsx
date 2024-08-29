import { NextPage } from 'next';
import { ChangeEvent, useEffect } from 'react';
import styled from '@emotion/styled';
import Create from '@components/party/Create';
import { DefaultHeader } from '@components/common/DefaultHeader';
import { patchParty } from 'src/api/patchParty';
import getPartyDetail, { API_GET_PARTY_DETAIL_KEY } from 'src/api/getPartyDetail';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postUploadImage } from 'src/api/postUploadImage';
import { partySchema } from '../create';
import { PositionSate } from 'src/recoil-states/positionStates';
import { useRecoilValue } from 'recoil';
import { API_GET_MAIN_PAGE } from 'src/api/getPartyMainPage';
import getProfile, { API_GET_PROFILE_KEY } from 'src/api/getProfile';
import { HeaderBackButton } from '@components/common/HeaderBackButton';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    min-height: calc(100vh);
    padding: 45px 1rem 0 1rem;
`;

const CreatePage: NextPage = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { id } = router.query as { id: string };
    const position = useRecoilValue(PositionSate);

    const { data: profileData } = useQuery({
        queryKey: [API_GET_PROFILE_KEY],
        queryFn: () => getProfile(),
    });

    const { data, isFetched } = useQuery({
        queryKey: [API_GET_PARTY_DETAIL_KEY, { id }],
        queryFn: () => getPartyDetail({ id, userId: String(profileData?.userId) }),
        enabled: !!id && !!profileData,
    });

    const { mutate: updateParty } = useMutation({
        mutationFn: patchParty,
    });

    const { mutate: uploadImage } = useMutation({
        mutationFn: postUploadImage,
    });

    const methods = useForm<PartyForm>({
        resolver: yupResolver(partySchema),
        mode: 'onSubmit',
    });

    const onSubmitPartyForm: SubmitHandler<PartyForm> = (formData: PartyForm) =>
        updateParty(
            {
                id,
                params: formData,
            },
            {
                onSuccess: async () => {
                    await queryClient.invalidateQueries({
                        queryKey: [API_GET_PARTY_DETAIL_KEY, { id, userId: profileData?.userId }],
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

    const handleChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.target;

        if (files) {
            uploadImage(files[0], {
                onSuccess({ imgUrl }) {
                    if (imgUrl) {
                        methods.setValue('thumbnail', imgUrl);
                    }
                },
            });
        }
    };

    useEffect(() => {
        // useForm에서는 초기값이 비동기적으로 적용이 되지 않아 따로 적용
        if (isFetched) {
            methods.reset({
                ...data,
            });
        }
    }, [data, isFetched, methods]);

    return data?.partyTitle ? (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmitPartyForm)}>
                <DefaultHeader centerArea={`${data.partyTitle}`} leftArea={<HeaderBackButton />} />
                <Create onChangeThumbnail={handleChangeThumbnail} />
            </Form>
        </FormProvider>
    ) : (
        <></>
    );
};

export default CreatePage;
