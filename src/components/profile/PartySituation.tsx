import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import styled from '@emotion/styled';
import { useState } from 'react';
import PartySituationItemList from './PartySituationItemList';
import ProfileTabSortingButton from './ProfileTabSortingButton';

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
    const [selectedRole, setSelectedRole] = useState<PartySituationRole>('HOST');
    return (
        <Container>
            <TabWrapper>
                {categoryTab.map((tab) => {
                    const onClick = () => {
                        setSelectedRole(tab.id);
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
                    <PartySituationItemList selectedRole={selectedRole} />
                </QuerySuspenseErrorBoundary>
            </PartyListContainer>
        </Container>
    );
};

export default PartySituation;
