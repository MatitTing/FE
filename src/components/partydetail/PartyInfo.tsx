import styled from '@emotion/styled';
import { Color } from 'styles/Color';
import { PartyDetailResponse } from 'types/party/detail/PartyDetailResponse';
import PartyMap from './PartyMap';
import PartyBrief from './PartyBrief';
import PartyDetail from './PartyDetail';
import PartyHostInfo from './PartyHostInfo';
import ReviewCard from '@components/common/card/ReviewCard';
import { DefaultText } from '@components/common/DefaultText';
import { useRouter } from 'next/router';

interface PartyInfoProps {
    data: PartyDetailResponse;
}

const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding-bottom: 80px;
    background: ${Color.LightGrey};
`;

const ReviewMoreSection = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 15px;
`;

const PartyInfoContainer = styled.div`
    display: flex;
    padding: 16px 0;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    gap: 16px;
    background-color: ${Color.LightGrey};
`;

const PartyInfo = ({ data }: PartyInfoProps) => {
    const { push, query } = useRouter();
    const { id } = query as { id: string };

    const partyBriefData = {
        partyTitle: data.partyTitle,
        category: data.category,
        hit: data.hit,
        totalParticipant: data.totalParticipant,
        participate: data.participate,
        gender: data.gender,
        age: data.age,
    };

    const partyDetailData = {
        deadline: data.deadline,
        partyTime: data.partyTime,
        menu: data.menu,
        partyContent: data.partyContent,
    };

    const partyMapData = {
        partyPlaceName: data.partyPlaceName,
        address: data.address,
        longitude: data.longitude,
        latitude: data.latitude,
    };

    return (
        <Container>
            <PartyInfoContainer>
                {data.isLeader && <PartyHostInfo />}
                <PartyBrief {...partyBriefData} />
                <PartyDetail {...partyDetailData} />
                <PartyMap {...partyMapData} />
                {data.reviewInfoRes.length > 0 && (
                    <>
                        {data.reviewInfoRes.map((review) => (
                            <ReviewCard key={review.reviewId} data={review} />
                        ))}
                        <ReviewMoreSection>
                            <DefaultText
                                onClick={() => {
                                    push(`/review?hostId=${id}`);
                                }}
                                text="방장님의 후기 더보기(MORE)"
                                weight={700}
                                size={15}
                            />
                        </ReviewMoreSection>
                    </>
                )}
            </PartyInfoContainer>
        </Container>
    );
};

export default PartyInfo;
