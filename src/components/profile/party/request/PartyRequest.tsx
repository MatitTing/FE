import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import ButtonList from '../../ProfileTabSortingButton';
import { useQuery } from '@tanstack/react-query';
import getPartyJoin from 'src/api/getPartyJoin';
import { API_GET_PARTY_JOIN_KEY } from 'src/api/getPartyJoin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import postPartyDecision from 'src/api/postPartyDecision';
import postParticipate from 'src/api/postParticipate';
import { useRouter } from 'next/router';
import ProfileTabSortingButton from '../../ProfileTabSortingButton';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import PartyRequestItemList from './PartyRequestItemList';
import { useSearchParam } from 'react-use';
import { DefaultText } from '@components/common/DefaultText';

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
const LoginRequiredTextWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

function isPartyRequestRole(value: unknown): value is PartyRequestRole {
    return value === 'HOST' || value === 'VOLUNTEER';
}

const PartyRequest = () => {
    const { replace, query } = useRouter();
    const requestRole = useSearchParam('role');
    const selectedRole = useMemo(() => {
        if (!requestRole || !isPartyRequestRole(requestRole)) {
            return;
        }
        return requestRole;
    }, [requestRole]);

    return (
        <Container>
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
                <QuerySuspenseErrorBoundary
                    errorFallback={({ resetErrorBoundary, error }) => {
                        if (error?.response?.status === 401) {
                            return (
                                <LoginRequiredTextWrapper>
                                    <DefaultText
                                        text="로그인이 필요합니다."
                                        margin="50px 0"
                                        size={15}
                                        weight={700}
                                    />
                                </LoginRequiredTextWrapper>
                            );
                        }
                    }}
                >
                    <PartyRequestItemList role={selectedRole || 'HOST'} />
                </QuerySuspenseErrorBoundary>
            </PartyRequestContainer>
        </Container>
    );
};

export default PartyRequest;
