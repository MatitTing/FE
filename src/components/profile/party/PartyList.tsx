import React from 'react';
import styled from '@emotion/styled';
import { DefaultText } from '@components/common/DefaultText';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { GetPartyCurrentSituationResponse } from 'types/party';
import { DefaultButton } from '@components/common/DefaultButton';
import { PartyStatusRole } from './status/PartySituation';
import { useRouter } from 'next/router';
interface PartyListProps {
    data: GetPartyCurrentSituationResponse;
    selectedRole: PartyStatusRole;
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    padding: 16px;
    border-bottom: 1px solid #ebebeb;
    transition: all 0.1s;
    &:hover {
        background-color: #dddddd;
    }
    cursor: pointer;
`;

const PartyDetail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
`;
const Title = styled.div`
    display: flex;
    flex-direction: row;
`;
const Address = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
`;
const Time = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
`;

const PartyList = ({ data, selectedRole }: PartyListProps) => {
    const { push } = useRouter();
    const { partyId, partyTitle, partyTime, address, thumbnail, status, reviewExist } = data;
    const onClickReview = () => {
        if (reviewExist) {
            push(`/review/${partyId}/edit`);
        } else {
            push(`/review/add?partyId=${partyId}`);
        }
    };

    return (
        <Link href={`/party/${partyId}`}>
            <Wrapper>
                <Container>
                    <Image
                        src={thumbnail || '/images/profile/profilebackground.jpg'}
                        alt="파티 썸네일"
                        width={100}
                        height={100}
                        style={{
                            objectFit: 'cover',
                            borderRadius: '4px',
                        }}
                    />
                    <PartyDetail>
                        <Title>
                            <DefaultText text={partyTitle} size={16} weight={500} />
                        </Title>
                        <Address>
                            <DefaultText text={address} size={14} color="#536471" />
                        </Address>
                        <Time>
                            <DefaultText
                                text={dayjs(partyTime).format('YYYY.MM.MM. HH:MM')}
                                size={14}
                                color="#536471"
                            />
                        </Time>
                    </PartyDetail>
                </Container>
                {selectedRole === 'VOLUNTEER' && status === 'PARTY_FINISH' && (
                    <DefaultButton
                        text={reviewExist ? '리뷰 수정하기' : '리뷰 남기기'}
                        onClick={onClickReview}
                    />
                )}
            </Wrapper>
        </Link>
    );
};

export default PartyList;
