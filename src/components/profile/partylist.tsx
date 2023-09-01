import React from "react";
import styled from "@emotion/styled";
import { ColorToken } from "styles/Color";
import { DefaultText } from "@components/common/DefaultText";
import useToast from "@hooks/useToast";
import Image from "next/image";
import { PartyData } from "types/party";

interface PartyListProps {
  partydata: PartyData;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  background-color: ${ColorToken.grey4};
  .partyimg {
    object-fit: cover;
    object-position: center;
  }
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

const PartyList = ({ partydata }: PartyListProps) => {
  const {
    categoryId = "",
    thumbnailUrl = "",
    partyTitle = "",
    region = "",
    partyTime = "",
    genderLimit = "",
    agePreference = "",
    partyMessage = "",
    totalRecruitment = "",
  } = partydata;
  // 토스트 테스트용
  const { showToast } = useToast();
  return (
    <Container
      onClick={() => {
        showToast(partyTitle);
      }}
    >
      <Image
        src="/images/profile/profile.png"
        width={160}
        height={120}
        className="partyimg"
      />
      <PartyDetail>
        <Title>
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
