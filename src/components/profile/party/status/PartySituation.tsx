import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';
import PartySituationItemList from './PartySituationItemList';
import ProfileTabSortingButton from '../../ProfileTabSortingButton';
import { useRouter } from 'next/router';
import { useSearchParam } from 'react-use';
import { PartyCurrentSituationRequestStatus } from 'types/party';
import { DefaultText } from '@components/common/DefaultText';

type PartySituationType = '참여' | '개설';
export type PartyStatusRole = 'HOST' | 'VOLUNTEER';
type PartyCurrentStatus = '모집중' | '모집마감' | '종료';

interface CategoryItemType {
    id: PartyStatusRole;
    label: PartySituationType;
}

interface StatusItemType {
    id: PartyCurrentSituationRequestStatus;
    label: PartyCurrentStatus;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const PartyListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 16px;
    overflow: auto;
`;
const TabWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
`;

const TabSection = styled.section`
    display: flex;
    gap: 10px;
`;

const LoginRequiredTextWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const categoryTab: CategoryItemType[] = [
    { id: 'VOLUNTEER', label: '참여' },
    { id: 'HOST', label: '개설' },
];

const statusTab: StatusItemType[] = [
    { id: 'RECRUIT', label: '모집중' },
    {
        id: 'RECRUIT_FINISH',
        label: '모집마감',
    },
    { id: 'PARTY_FINISH', label: '종료' },
];

function isPartyRole(value: unknown): value is PartyStatusRole {
    return value === 'HOST' || value === 'VOLUNTEER';
}
function isPartySituation(value: unknown): value is PartyCurrentSituationRequestStatus {
    return value === 'RECRUIT' || value === 'RECRUIT_FINISH' || value === 'PARTY_FINISH';
}

const PartySituation = () => {
    const { replace, query } = useRouter();
    const role = useSearchParam('role');
    const status = useSearchParam('status');
    const selectedRole = useMemo(() => {
        if (!role || !isPartyRole(role)) {
            return;
        }
        return role;
    }, [role]);

    const selectedStatus = useMemo(() => {
        if (!status || !isPartySituation(status)) {
            return;
        }
        return status;
    }, [status]);

    return (
        <Container>
            <TabWrapper>
                <TabSection>
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
                </TabSection>
                <TabSection>
                    {statusTab.map((tab) => {
                        const onClick = () => {
                            replace({ query: { ...query, status: tab.id } });
                        };

                        return (
                            <ProfileTabSortingButton
                                key={tab.id}
                                text={tab.label}
                                filled={tab.id === selectedStatus}
                                onClick={onClick}
                            />
                        );
                    })}
                </TabSection>
            </TabWrapper>

            <PartyListContainer>
                <QuerySuspenseErrorBoundary
                    errorFallback={({ error }) => {
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
                    <PartySituationItemList
                        selectedRole={selectedRole || 'HOST'}
                        selectedStatus={selectedStatus || 'RECRUIT'}
                    />
                </QuerySuspenseErrorBoundary>
            </PartyListContainer>
        </Container>
    );
};

export default PartySituation;
