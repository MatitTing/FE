import React from "react";
import styled from "@emotion/styled";
import { ColorToken } from "styles/Color";
import { DefaultText } from "@components/common/DefaultText";
import useToast from "@hooks/useToast";

interface PartyData {
  categoryId: string;
  thumbnailUrl: string;
  partyTitle: string;
  region: string;
  partyTime: string;
  genderLimit: string;
  agePreference: string;
  partyMessage: string;
  totalRecruitment: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  background-color: ${ColorToken.grey4};
`;
const PartyDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
`;
const Detail1 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;
const Detail2 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const PartyImg = styled.img`
  width: 160px;
  height: 120px;
  object-fit: cover;
  object-position: center;
`;

const PartyList = ({
  categoryId,
  thumbnailUrl,
  partyTitle,
  region,
  partyTime,
  genderLimit,
  agePreference,
  partyMessage,
  totalRecruitment,
}: PartyData) => {
  const { showToast } = useToast();
  return (
    <Container
      onClick={() => {
        showToast("123");
      }}
    >
      <PartyImg src="/images/profile/profile.png"></PartyImg>
      <PartyDetail>
        <Title className="title">
          <DefaultText text={partyTitle} size={16}></DefaultText>
        </Title>
        <Detail1>
          <span className="region">{region}</span>
          <span className="time">{partyTime}</span>
        </Detail1>
        <Detail2>
          <span className="people">{totalRecruitment}</span>•
          <span className="gender">{genderLimit}</span>•
          <span className="age">{agePreference}</span>
        </Detail2>
      </PartyDetail>
    </Container>
  );
};

export default PartyList;
