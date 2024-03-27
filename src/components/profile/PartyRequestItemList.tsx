import { useSuspenseQuery } from '@tanstack/react-query';
import { FC } from 'react';
import getPartyJoin, { API_GET_PARTY_JOIN_KEY } from 'src/api/getPartyJoin';
import { PartyRequestRole } from './PartyRequest';
import PartyRequestList from './PartyRequestCard';
import { DefaultText } from '@components/common/DefaultText';
import styled from '@emotion/styled';
import PartyRequestCard from './PartyRequestCard';

interface PartyRequestItemListProps {
    role: PartyRequestRole;
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
`;

const PartyRequestItemList: FC<PartyRequestItemListProps> = ({ role }) => {
    const requestList = useSuspenseQuery({
        queryKey: [API_GET_PARTY_JOIN_KEY, { role }],
        queryFn: () => getPartyJoin({ role }),
    });

    if (!requestList.data.length) {
        return (
            <Container>
                <DefaultText text="현재 조회된 요청이 없습니다." size={18} weight={700} />
            </Container>
        );
    }

    return requestList.data.map((request) => (
        <PartyRequestCard key={request.partyId} data={request} role={role} />
    ));
};

export default PartyRequestItemList;
