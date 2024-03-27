import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import PartySituationItemList from './PartySituationItemList';
import ProfileTabSortingButton from './ProfileTabSortingButton';
import { useRouter } from 'next/router';
import { useSearchParam } from 'react-use';

type PartySituationType = '모집중' | '참가중';
export type PartySituationRole = 'HOST' | 'VOLUNTEER';

interface CategoryItemType {
    id: PartySituationRole;
    label: PartySituationType;
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
    gap: 10px;
    padding: 10px;
`;

const categoryTab: CategoryItemType[] = [
    { id: 'HOST', label: '모집중' },
    { id: 'VOLUNTEER', label: '참가중' },
];

const PartySituation = () => {
    // const [selectedRole, setSelectedRole] = useState<PartySituationRole>('HOST');
    const { replace, query } = useRouter();
    const situationRole = useSearchParam('situationRole');
    const selectedRole = useMemo(() => {
        if (!situationRole) {
            return;
        }
        return situationRole;
    }, [situationRole]);

    return (
        <Container>
            <TabWrapper>
                {categoryTab.map((tab) => {
                    const onClick = () => {
                        replace({ query: { ...query, situationRole: tab.id } });
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

            <PartyListContainer>
                <QuerySuspenseErrorBoundary>
                    <PartySituationItemList selectedRole={'HOST'} />
                </QuerySuspenseErrorBoundary>
            </PartyListContainer>
        </Container>
    );
};

export default PartySituation;
