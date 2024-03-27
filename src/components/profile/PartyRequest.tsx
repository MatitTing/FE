import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import ButtonList from './ProfileTabSortingButton';
import { useQuery } from '@tanstack/react-query';
import getPartyJoin from 'src/api/getPartyJoin';
import { API_GET_PARTY_JOIN_KEY } from 'src/api/getPartyJoin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import postPartyDecision from 'src/api/postPartyDecision';
import postParticipate from 'src/api/postParticipate';
import { useRouter } from 'next/router';
import ProfileTabSortingButton from './ProfileTabSortingButton';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import PartyRequestItemList from './PartyRequestItemList';
import { useSearchParam } from 'react-use';

type PartyRequestType = '받은요청' | '보낸요청';
export type PartyRequestRole = 'HOST' | 'VOLUNTEER';

interface CategoryItemType {
    id: PartyRequestRole;
    label: PartyRequestType;
}

const categoryTab: CategoryItemType[] = [
    { id: 'HOST', label: '받은요청' },
    { id: 'VOLUNTEER', label: '보낸요청' },
];

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const TabWrapper = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
`;

const PartyRequestContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 16px;
    overflow: auto;
`;

function isPartyRequestRole(value: unknown): value is PartyRequestRole {
    return value === 'HOST' || value === 'VOLUNTEER';
}

const PartyRequest = () => {
    // const [selectedRole, setSelectedRole] = useState<PartyRequestRole>('HOST');
    const { replace, query } = useRouter();
    const requestRole = useSearchParam('role');
    const selectedRole = useMemo(() => {
        if (!requestRole || !isPartyRequestRole(requestRole)) {
            return;
        }
        return requestRole;
    }, [requestRole]);

    // const queryClient = useQueryClient();

    // const { data } = useQuery({
    //     queryKey: [API_GET_PARTY_JOIN_KEY, { role }],
    //     queryFn: () => getPartyJoin({ role }),
    //     enabled: !!role,
    // });

    // const postDecisionMutate = useMutation({
    //     mutationFn: postPartyDecision,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({
    //             queryKey: [API_GET_PARTY_JOIN_KEY, { role }],
    //         });
    //     },
    // });

    // const postParticipateMutate = useMutation({
    //     mutationFn: postParticipate,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({
    //             queryKey: [API_GET_PARTY_JOIN_KEY, { role }],
    //         });
    //     },
    // });

    // const joinDecision = (id: number, nickname: string, status: boolean) => {
    //     if (role === 'HOST') {
    //         return postDecisionMutate.mutate({
    //             nickname: nickname,
    //             partyId: Number(id),
    //             status: `${status ? 'ACCEPT' : 'REFUSE'}`,
    //         });
    //     }
    //     postParticipateMutate.mutate({
    //         partyId: Number(id),
    //         status: `${status ? 'APPLY' : 'CANCEL'}`,
    //     });
    // };

    // const setButtonState = (state: string) => {
    //     router.replace({
    //         query: {
    //             ...router.query,
    //             role: state,
    //         },
    //     });
    // };

    return (
        <Container>
            {/* <ButtonList
        listinfo={buttonlistinfo}
        state={role}
        setState={setButtonState}
      /> */}
            <TabWrapper>
                {categoryTab.map((tab) => {
                    const onClick = () => {
                        replace({ query: { ...query, role: tab.id } });
                    };

                    return (
                        <ProfileTabSortingButton
                            key={tab.id}
                            text={tab.label}
                            filled={tab.id === selectedRole}
                            onClick={onClick}
                        />
                    );
                })}
            </TabWrapper>

            <PartyRequestContainer>
                <QuerySuspenseErrorBoundary>
                    <PartyRequestItemList role={selectedRole || 'HOST'} />
                </QuerySuspenseErrorBoundary>
                {/* {data?.map((requsetdata) => (
                    <PartyRequest
                        key={requsetdata.nickname}
                        role={role}
                        data={requsetdata}
                        joinDecision={joinDecision}
                    />
                ))} */}
            </PartyRequestContainer>
        </Container>
    );
};

export default PartyRequest;
