import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import PartySituationItemList from './PartySituationItemList';
import ProfileTabSortingButton from './ProfileTabSortingButton';
import { useRouter } from 'next/router';
import { useSearchParam } from 'react-use';
import { PartyCurrentSituationRequestStatus } from 'types/party';

type PartySituationType = '모집중' | '참가중';
export type PartySituationRole = 'HOST' | 'VOLUNTEER';
type PartyCurrentStatus = '모집중' | '모집완료' | '파티종료';

interface CategoryItemType {
    id: PartySituationRole;
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

const categoryTab: CategoryItemType[] = [
    { id: 'HOST', label: '모집중' },
    { id: 'VOLUNTEER', label: '참가중' },
];

const statusTab: StatusItemType[] = [
    { id: 'RECRUIT', label: '모집중' },
    {
        id: 'RECRUIT_FINISH',
        label: '모집완료',
    },
    { id: 'PARTY_FINISH', label: '파티종료' },
];

function isPartySituationRole(value: unknown): value is PartySituationRole {
    return value === 'HOST' || value === 'VOLUNTEER';
}
function isPartySituation(value: unknown): value is PartyCurrentSituationRequestStatus {
    return value === 'RECRUIT' || value === 'RECRUIT_FINISH' || value === 'PARTY_FINISH';
}

const PartySituation = () => {
    const { replace, query } = useRouter();
    const situationRole = useSearchParam('role');
    const situation = useSearchParam('situation');
    const selectedRole = useMemo(() => {
        if (!situationRole || !isPartySituationRole(situationRole)) {
            return;
        }
        return situationRole;
    }, [situationRole]);

    const selectedSituation = useMemo(() => {
        if (!situation || !isPartySituation(situation)) {
            return;
        }
        return situation;
    }, [situation]);

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
                                filled={tab.id === selectedSituation}
                                onClick={onClick}
                            />
                        );
                    })}
                </TabSection>
            </TabWrapper>

            <PartyListContainer>
                <QuerySuspenseErrorBoundary>
                    <PartySituationItemList selectedRole={selectedRole || 'HOST'} />
                </QuerySuspenseErrorBoundary>
            </PartyListContainer>
        </Container>
    );
};

export default PartySituation;
