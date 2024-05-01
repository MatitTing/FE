import { DefaultButton } from '@components/common/DefaultButton';
import { DefaultModalContainer } from '@components/common/DefaultModalContainer';
import styled from '@emotion/styled';
import useToast from '@hooks/useToast';
import { Transition } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import deletePartyDetail from 'src/api/deletePartyDetail';
import { API_GET_PARTY_DETAIL_KEY } from 'src/api/getPartyDetail';
import { API_GET_MAIN_PAGE } from 'src/api/getPartyMainPage';
import postParticipate from 'src/api/postParticipate';
import ConfirmPopup from '../popup/ConfirmPopup';
import PartyDetailPartyRequestPopup from './PartyDetailPartyRequestPopup';
import { isAxiosError } from 'axios';

export interface PartyRequestPopupForm {
    oneLineIntroduce: string;
}
interface PartyDetailBottomBarProps {
    isLeader: boolean;
}

const Container = styled.div`
    width: 100%;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    border-top: 1px solid #dddddd;
    position: fixed;
    z-index: 3;
    background-color: white;
    box-shadow:
        0 1px 3px rgba(0, 0, 0, 0.12),
        0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const IconContainer = styled.div`
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.1s;
    &:hover {
        background-color: #dddddd;
    }
`;

const BottomBarContainer = styled.div`
    width: 768px;
    display: flex;
`;

const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 20px;
    gap: 10px;
`;

const PartyDetailBottomBar = ({ isLeader }: PartyDetailBottomBarProps) => {
    const { push } = useRouter();
    const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
    const [isOpenParticipatePopup, setIsOpenParticipatePopup] = useState(false);
    const { showToast } = useToast();
    const router = useRouter();
    const { id } = router.query as { id: string };
    const queryClient = useQueryClient();
    const form = useForm({
        defaultValues: {
            oneLineIntroduce: '',
        },
    });

    const postParticipateMutate = useMutation({
        mutationFn: postParticipate,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [API_GET_PARTY_DETAIL_KEY, { id }],
            });
            showToast('파티가 신청되었습니다. 방장의 수락을 기다려 주세요.');
            setIsOpenParticipatePopup(false);
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                console.log(error);
                showToast(error.response?.data.errorMessage);
            }
        },
    });

    const deletePartyDetailMutate = useMutation({
        mutationFn: deletePartyDetail,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [API_GET_MAIN_PAGE],
            });
            showToast('파티가 삭제되었습니다.');
            router.push('/');
        },
    });

    const onValid = ({ oneLineIntroduce }: PartyRequestPopupForm) => {
        postParticipateMutate.mutate({
            partyId: Number(id),
            oneLineIntroduce,
            status: 'APPLY',
        });
    };

    return (
        <Container>
            <BottomBarContainer>
                {isLeader ? (
                    <ButtonContainer>
                        <DefaultButton
                            w="50%"
                            text={'파티 삭제'}
                            onClick={() => setIsOpenDeletePopup(true)}
                        />
                        <DefaultButton
                            w="50%"
                            text={'파티 수정'}
                            onClick={() => push(`/party/edit/${id}`)}
                        />
                    </ButtonContainer>
                ) : (
                    <ButtonContainer>
                        <DefaultButton
                            w="100%"
                            text={'참가신청'}
                            onClick={() => setIsOpenParticipatePopup(true)}
                        />
                    </ButtonContainer>
                )}
            </BottomBarContainer>
            <Transition
                transition={`fade`}
                mounted={isOpenParticipatePopup}
                duration={200}
                timingFunction="ease"
            >
                {(styles) => (
                    <DefaultModalContainer style={styles}>
                        <FormProvider {...form}>
                            <PartyDetailPartyRequestPopup
                                closePopup={() => {
                                    setIsOpenParticipatePopup(false);
                                }}
                                onSubmit={form.handleSubmit(onValid)}
                            />
                        </FormProvider>
                    </DefaultModalContainer>
                )}
            </Transition>
            <Transition
                transition={`fade`}
                mounted={isOpenDeletePopup}
                duration={200}
                timingFunction="ease"
            >
                {(styles) => (
                    <DefaultModalContainer style={styles}>
                        <ConfirmPopup
                            cancelPopup={() => setIsOpenDeletePopup(false)}
                            confirmPopup={() => {
                                deletePartyDetailMutate.mutate({ id });
                            }}
                            description="정말로 삭제하시겠습니까?"
                        />
                    </DefaultModalContainer>
                )}
            </Transition>
        </Container>
    );
};

export default PartyDetailBottomBar;
