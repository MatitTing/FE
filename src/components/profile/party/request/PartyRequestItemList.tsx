import { DefaultText } from '@components/common/DefaultText';
import { ObserverTrigger } from '@components/hoc/ObserverTrigger';
import styled from '@emotion/styled';
import { useMutation, useQueryClient, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import getPartyJoin, { API_GET_PARTY_JOIN_KEY } from 'src/api/getPartyJoin';
import { PartyRequestRole } from './PartyRequest';
import PartyRequestCard from './PartyRequestCard';
import postParticipate from 'src/api/postParticipate';
import { Transition } from '@mantine/core';
import { DefaultModalContainer } from '@components/common/DefaultModalContainer';
import ConfirmPopup from '@components/popup/ConfirmPopup';
import { API_GET_PARTY_DETAIL_KEY } from 'src/api/getPartyDetail';
import useToast from '@hooks/useToast';
import { isAxiosError } from 'axios';

interface PartyRequestItemListProps {
    role: PartyRequestRole;
}

type PartyPopupType = {
    isOpen: boolean;
    partyId?: number;
};

interface PopupProps {
    refuseRequestPopup: PartyPopupType;
    acceptRequestPopup: PartyPopupType;
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
`;

const PartyRequestItemList: FC<PartyRequestItemListProps> = ({ role }) => {
    const queryClient = useQueryClient();
    const { showToast } = useToast();
    const [popup, setPopup] = useState<PopupProps>({
        refuseRequestPopup: {
            isOpen: false,
            partyId: undefined,
        },
        acceptRequestPopup: {
            isOpen: false,
            partyId: undefined,
        },
    });
    const { mutate: cancelRequest } = useMutation({
        mutationFn: postParticipate,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [API_GET_PARTY_DETAIL_KEY, { id: popup.refuseRequestPopup.partyId }],
            });
            await queryClient.invalidateQueries({
                queryKey: [API_GET_PARTY_JOIN_KEY, { role }],
            });
            showToast('파티가 취소되었습니다.');
            setPopup((prev) => ({
                ...prev,
                refuseRequestPopup: {
                    isOpen: false,
                    partyId: undefined,
                },
            }));
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                showToast(error.response?.data.errorMessage);
            }
        },
    });

    const partyRequestList = useSuspenseInfiniteQuery({
        queryKey: [API_GET_PARTY_JOIN_KEY, { role }],
        queryFn: ({ pageParam = 0 }) =>
            getPartyJoin({
                page: pageParam,
                role,
                size: 5,
            }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (!lastPage?.pageInfo.hasNext) {
                return undefined;
            }
            return lastPage.pageInfo.page + 1;
        },
    });
    const onObserve = () => {
        if (partyRequestList.hasNextPage) partyRequestList.fetchNextPage();
    };

    const onClickRefuseButton = ({ partyId }: { partyId: number }) => {
        if (role === 'VOLUNTEER') {
            cancelRequest({
                partyId,
                status: 'CANCEL',
            });
        }
    };

    if (!partyRequestList.data.pages[0].partyList.length) {
        return (
            <Container>
                <DefaultText text="현재 조회된 요청이 없습니다." size={18} weight={700} />
            </Container>
        );
    }

    return (
        <>
            <ObserverTrigger onObserve={onObserve} observerMinHeight="30px">
                {partyRequestList.data.pages.map((request) =>
                    request.partyList.map((individualRequest) => (
                        <PartyRequestCard
                            onClickAcceptButton={() =>
                                setPopup((prev) => ({
                                    ...prev,
                                    acceptRequestPopup: {
                                        isOpen: true,
                                        partyId: individualRequest.partyId,
                                    },
                                }))
                            }
                            onClickRefuseButton={() =>
                                setPopup((prev) => ({
                                    ...prev,
                                    refuseRequestPopup: {
                                        isOpen: true,
                                        partyId: individualRequest.partyId,
                                    },
                                }))
                            }
                            key={individualRequest.partyId}
                            data={individualRequest}
                            role={role}
                        />
                    )),
                )}
            </ObserverTrigger>
            <Transition
                transition={`fade`}
                mounted={popup.acceptRequestPopup.isOpen}
                duration={200}
                timingFunction="ease"
            >
                {(styles) => (
                    <DefaultModalContainer style={styles}>
                        <ConfirmPopup
                            cancelPopup={() =>
                                setPopup((prev) => ({
                                    ...prev,
                                    acceptRequestPopup: {
                                        isOpen: false,
                                        partyId: undefined,
                                    },
                                }))
                            }
                            confirmPopup={() => {
                                // cancelRequest.mutate({});
                            }}
                            description="정말 요청을 승낙하시겠습니까?"
                        />
                    </DefaultModalContainer>
                )}
            </Transition>
            <Transition
                transition={`fade`}
                mounted={popup.refuseRequestPopup.isOpen}
                duration={200}
                timingFunction="ease"
            >
                {(styles) => (
                    <DefaultModalContainer style={styles}>
                        <ConfirmPopup
                            cancelPopup={() =>
                                setPopup((prev) => ({
                                    ...prev,
                                    refuseRequestPopup: {
                                        isOpen: false,
                                        partyId: undefined,
                                    },
                                }))
                            }
                            confirmPopup={() => {
                                if (!popup.refuseRequestPopup.partyId) {
                                    return;
                                }
                                onClickRefuseButton({ partyId: popup.refuseRequestPopup.partyId });
                            }}
                            description="정말 요청을 취소하시겠습니까?"
                        />
                    </DefaultModalContainer>
                )}
            </Transition>
        </>
    );
};

export default PartyRequestItemList;
