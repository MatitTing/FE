import React from "react";
import styled from "@emotion/styled";
import PartyImg from "./PartyImg";
import LocationIcon from "@components/icons/profile/Location.icon";
import GenderIcon from "@components/icons/profile/Gender.icon";
import InfoIcon from "@components/icons/profile/Info.icon";
import { useRouter } from "next/router";

interface DescriptionDataType {
  partyTitle: string;
  partyContent: string;
  status: string;
  gender: string;
  age: string;
  deadline: string;
  partyTime: string;
  totalParticipate: number;
  participate: number;
  thumbnail: string;
  address?: string;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-bottom: 20px;
  background-color: white;
`;

const PartyDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
  z-index: 99;
  background-color: white;
`;

const PartyTitle = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 99;
  gap: 10px;
  .title {
    font-size: 24px;
    font-weight: 400;
  }
  .time {
    font-size: 20px;
    color: #5f5f5f;
  }
`;

const PartyDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  font-size: 20px;
  color: #919191;
  .name {
    margin-bottom: 8px;
  }
  span {
    margin-left: 4px;
  }
`;
const PartyExplain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  font-size: 20px;
  color: #919191;
`;

const partydata = {
  name: "username",
  locaton: "서울광역시",
  gender: "남성",
  age: "20대",
  mannerdegree: 30,
  explain: "설명설명",
};

const PartyInfo = (description: DescriptionDataType) => {
  const {
    partyTitle,
    partyContent,
    status,
    gender,
    age,
    deadline,
    partyTime,
    totalParticipate,
    participate,
    thumbnail,
    address,
  } = description;

  const router = useRouter();

  return (
    <Container>
      <PartyDetailContainer>
        <PartyTitle>
          <div className="title">
            <span>{partyTitle}</span>
          </div>
          <div className="time">
            <span>{partyTime}</span>
          </div>
        </PartyTitle>
        <PartyDetail>
          <div className="age">
            <LocationIcon />
            <span>{address}</span>
          </div>
          <div className="gender">
            <GenderIcon />
            <span>{gender}</span>
          </div>
          <div className="count">
            <InfoIcon />
            <span>{age}</span>
          </div>
        </PartyDetail>
        <PartyExplain>
          <span>{partyContent}</span>
        </PartyExplain>
      </PartyDetailContainer>
    </Container>
  );
};

export default PartyInfo;
