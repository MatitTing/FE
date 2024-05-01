import PartyInfo from '@components/partydetail/PartyInfo';
import { useRouter } from 'next/router';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import getPartyDetail, { API_GET_PARTY_DETAIL_KEY } from 'src/api/getPartyDetail';
import BackgroundImage from '@components/common/BackgroundImage';
import PartyDetailBottomBar from '@components/partydetail/PartyDetailBottomBar';
import postParticipate from 'src/api/postParticipate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import deletePartyDetail from 'src/api/deletePartyDetail';
import { API_GET_MAIN_PAGE } from 'src/api/getPartyMainPage';
import useToast from '@hooks/useToast';
import styled from '@emotion/styled';
import Image from 'next/image';

const PartyDetailContent = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };

    const { data } = useSuspenseQuery({
        queryKey: [API_GET_PARTY_DETAIL_KEY, { id }],
        queryFn: () => getPartyDetail({ id }),
    });

    return (
        <>
            <Image src={data.thumbnail} alt="배경 이미지" width={768} height={300} />
            <PartyInfo data={data} />
            <PartyDetailBottomBar isLeader={data.isLeader} />
        </>
    );
};

export default PartyDetailContent;
