import { useSuspenseQuery } from '@tanstack/react-query';
import { FC } from 'react';
import getPartyStatus, { API_GET_PARTY_STATUS_KEY } from 'src/api/getPartyCurrentSituation';
import { PartySituationRole } from './PartySituation';
import PartyList from './PartyList';
import { DefaultText } from '@components/common/DefaultText';
import styled from '@emotion/styled';

interface PartySituationItemListProps {
    selectedRole: PartySituationRole;
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
`;

const PartySituationItemList: FC<PartySituationItemListProps> = ({ selectedRole }) => {
    const statusList = useSuspenseQuery({
        queryKey: [API_GET_PARTY_STATUS_KEY, { role: selectedRole }],
        queryFn: () => getPartyStatus({ role: selectedRole }),
    });
    if (!statusList.data.length) {
        return (
            <Container>
                <DefaultText text="현재 조회된 파티가 없습니다." size={18} weight={700} />
            </Container>
        );
    }
    return statusList.data.map((status) => <PartyList key={status.partyId} data={status} />);
};

export default PartySituationItemList;
