import { DefaultText } from '@components/common/DefaultText';
import { ObserverTrigger } from '@components/hoc/ObserverTrigger';
import styled from '@emotion/styled';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { FC } from 'react';
import getPartyStatus, { API_GET_PARTY_STATUS_KEY } from 'src/api/getPartyCurrentSituation';
import { PartyCurrentSituationRequestStatus } from 'types/party';
import PartyList from '../PartyList';
import { PartyStatusRole } from './PartySituation';

interface PartySituationItemListProps {
    selectedRole: PartyStatusRole;
    selectedStatus: PartyCurrentSituationRequestStatus;
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
`;

const PartySituationItemList: FC<PartySituationItemListProps> = ({
    selectedRole,
    selectedStatus,
}) => {
    const partyStatusList = useSuspenseInfiniteQuery({
        queryKey: [API_GET_PARTY_STATUS_KEY, { role: selectedRole }],
        queryFn: ({ pageParam = 0 }) =>
            getPartyStatus({
                page: pageParam,
                role: selectedRole,
                status: selectedStatus,
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
        if (partyStatusList.hasNextPage) partyStatusList.fetchNextPage();
    };
    if (!partyStatusList.data.pages[0].partyList.length) {
        return (
            <Container>
                <DefaultText text="현재 조회된 파티가 없습니다." size={18} weight={700} />
            </Container>
        );
    }

    return (
        <ObserverTrigger onObserve={onObserve} observerMinHeight="30px">
            {partyStatusList.data.pages.map((status) =>
                status.partyList.map((individualStatus) => (
                    <PartyList
                        key={individualStatus.partyId}
                        data={individualStatus}
                        selectedRole={selectedRole}
                    />
                )),
            )}
        </ObserverTrigger>
    );
};

export default PartySituationItemList;
