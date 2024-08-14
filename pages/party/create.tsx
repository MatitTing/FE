import { GetServerSideProps, NextPage } from 'next';
import { ChangeEvent, useEffect } from 'react';
import styled from '@emotion/styled';
import Create from '@components/party/Create';
import { DefaultHeader } from '@components/common/DefaultHeader';
import { postParty } from 'src/api/postParty';
import * as yup from 'yup';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import router from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postUploadImage } from 'src/api/postUploadImage';
import { useRecoilValue } from 'recoil';
import { API_GET_MAIN_PAGE } from 'src/api/getPartyMainPage';
import { PositionSate } from 'src/recoil-states/positionStates';
import { API_GET_CHAT_ROOMS_KEY } from 'src/api/getChatRooms';
import dayjs from 'dayjs';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 760px;
    min-width: 320px;
    height: 100%;
    min-height: calc(100vh);
    margin: 0 auto;
    padding: 60px 0 76px 0;
`;

export const partySchema = yup.object({
    partyTitle: yup.string().min(2, '2자 이상 입력해주세요').required(),
    partyContent: yup.string().max(50, '50자 이하로 작성해주세요').required(),
    partyTime: yup.string().required(),
    gender: yup.string().required(),
    category: yup.string().required(),
    // age: yup.mixed<string[]>().required(),
    age: yup.string().required(),
    totalParticipant: yup.number().required(),
    menu: yup.string().required(),
    thumbnail: yup.string(),
    status: yup.string(),
    partyPlaceName: yup.string().required(),
    latitude: yup.number().required(),
    longitude: yup.number().required(),
});

interface CreatePageProviderProps {
    loginMessage: string;
}

export const CreatePage = () => {
    const queryClient = useQueryClient();
    const position = useRecoilValue(PositionSate);

    const { mutate: postPartyCreate } = useMutation({
        mutationFn: postParty,
    });

    const { mutate: postImage } = useMutation({
        mutationFn: postUploadImage,
    });

    const methods = useForm<PartyForm>({
        resolver: yupResolver(partySchema),
        mode: 'onSubmit',
        defaultValues: {
            totalParticipant: 2,
            age: 'ALL',
            category: 'KOREAN',
            gender: 'ALL',
            partyTime: dayjs().format('YYYY-MM-DDTHH:mm'),
        },
    });

    const onSubmitPartyForm: SubmitHandler<PartyForm> = (formData: PartyForm) =>
        postPartyCreate(formData, {
            onSuccess: async ({ data }) => {
                if (data) {
                    await queryClient.invalidateQueries({
                        queryKey: [
                            API_GET_MAIN_PAGE,
                            { latitude: position.coords.x, longitude: position.coords.y },
                        ],
                    });

                    await queryClient.invalidateQueries({
                        queryKey: [API_GET_CHAT_ROOMS_KEY],
                    });

                    router.replace(`/party/${data.partyId}`);
                }
            },
        });

    const handleChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.target;

        if (files) {
            postImage(files[0], {
                onSuccess({ imgUrl }) {
                    if (imgUrl) {
                        methods.setValue('thumbnail', imgUrl);
                    }
                },
            });
        }
    };

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmitPartyForm)}>
                <DefaultHeader centerArea="파티 생성" />
                <Create onChangeThumbnail={handleChangeThumbnail} />
            </Form>
        </FormProvider>
    );
};

const CreatePageProvider: NextPage<CreatePageProviderProps> = ({ loginMessage }) => {
    useEffect(() => {
        const loginRoutting = async () => {
            if (loginMessage.length) {
                alert('로그인이 필요합니다. 로그인 해 주세요.');
                await router.replace('/signin');
            }
        };

        loginRoutting();
    }, [loginMessage.length]);

    return loginMessage ? <></> : <CreatePage />;
};

export default CreatePageProvider;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;
    const refreshToken = req.cookies.refreshToken;

    return {
        props: {
            loginMessage: refreshToken ? '' : '로그인 필요',
        },
    };
};
