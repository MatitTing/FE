import React, { MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { DefaultText } from '@components/common/DefaultText';
import CheckIcon from '@components/icons/common/Check.icon';
import CloseIcon from '@components/icons/common/Close.icon';
import { PartyJoinResponse } from 'types/party/join/PartyJoinResponse';
import Link from 'next/link';

interface PartyRequestCardProps {
    role: string;
    data: PartyJoinResponse;
    onClickAcceptButton?: MouseEventHandler<HTMLButtonElement>;
    onClickRefuseButton?: MouseEventHandler<HTMLButtonElement>;
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 72px;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid #ebebeb;
`;

const RequestInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-direction: row;
`;
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
`;
const IconContainer = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transition: all 0.1s;
    &:hover {
        background-color: #dddddd;
    }
`;

const PartyRequestCard = ({
    role,
    data,
    onClickAcceptButton,
    onClickRefuseButton,
}: PartyRequestCardProps) => {
    const { partyId, partyTitle, nickname } = data;

    const isHost = role === 'HOST';

    return (
        <Container>
            <RequestInfo>
                <Image
                    src="/images/profile/profile.png"
                    alt="프로필사진"
                    width={48}
                    height={48}
                    style={{ borderRadius: '50%' }}
                />
                {isHost && <DefaultText text={nickname} size={14} />}
                <Link href={`/party/${partyId}`}>
                    {isHost ? (
                        <DefaultText text={`@${partyTitle}`} size={14} color="#536471" />
                    ) : (
                        <DefaultText text={partyTitle} size={14} />
                    )}
                </Link>
            </RequestInfo>
            <ButtonContainer>
                {isHost && (
                    <IconContainer onClick={onClickAcceptButton}>
                        <CheckIcon />
                    </IconContainer>
                )}
                <IconContainer onClick={onClickRefuseButton}>
                    <CloseIcon />
                </IconContainer>
            </ButtonContainer>
        </Container>
    );
};

export default PartyRequestCard;
