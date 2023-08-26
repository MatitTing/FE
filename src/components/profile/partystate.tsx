import React from "react";
import styled from "@emotion/styled";
import ToggleButton from "./togglebutton";
import { useState, useEffect } from "react";
import PartyList from "./partylist";

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
  flex-direction: column;
`;
const PartyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px;
  height: 1200px;
`;

const PartyListData1 = [
  {
    categoryId: "1",
    thumbnailUrl: "http://피자.com",
    partyTitle: "연남 plop에서 피자드실분!",
    region: "서울 마포구 동교로38길 27-9 1층",
    partyTime: "2023.08.08:12:30:00",
    genderLimit: "상관 없음",
    agePreference: "20대",
    partyMessage: "피자 종류는 다 같이 정해봐요",
    totalRecruitment: "4명",
  },
];
const PartyListData2 = [
  {
    categoryId: "2",
    thumbnailUrl: "http://피자.com",
    partyTitle: "연남 plop에서 피자드실분!",
    region: "서울 마포구 동교로38길 27-9 1층",
    partyTime: "2023.08.08:12:30:00",
    genderLimit: "상관 없음",
    agePreference: "20대",
    partyMessage: "피자 종류는 다 같이 정해봐요",
    totalRecruitment: "4명",
  },
  {
    categoryId: "3",
    thumbnailUrl: "http://피자.com",
    partyTitle: "연남 plop에서 피자드실분!",
    region: "서울 마포구 동교로38길 27-9 1층",
    partyTime: "2023.08.08:12:30:00",
    genderLimit: "상관 없음",
    agePreference: "20대",
    partyMessage: "피자 종류는 다 같이 정해봐요",
    totalRecruitment: "4명",
  },
];
const PartyListData3 = [
  {
    categoryId: "4",
    thumbnailUrl: "http://피자.com",
    partyTitle: "연남 plop에서 피자드실분!",
    region: "서울 마포구 동교로38길 27-9 1층",
    partyTime: "2023.08.08:12:30:00",
    genderLimit: "상관 없음",
    agePreference: "20대",
    partyMessage: "피자 종류는 다 같이 정해봐요",
    totalRecruitment: "4명",
  },
  {
    categoryId: "5",
    thumbnailUrl: "http://피자.com",
    partyTitle: "연남 plop에서 피자드실분!",
    region: "서울 마포구 동교로38길 27-9 1층",
    partyTime: "2023.08.08:12:30:00",
    genderLimit: "상관 없음",
    agePreference: "20대",
    partyMessage: "피자 종류는 다 같이 정해봐요",
    totalRecruitment: "4명",
  },
];

const PartyState = () => {
  const [partystate, setPartystate] = useState<string>("host");

  //react-qurry 임시대체
  const [data, setData] = useState<any>();

  useEffect(() => {
    setData(
      partystate === "host"
        ? PartyListData1
        : partystate === "member"
        ? PartyListData2
        : PartyListData3
    );
  }, [partystate]);

  return (
    <Container>
      <ToggleButton
        partystate={partystate}
        setPartystate={setPartystate}
      ></ToggleButton>
      <PartyListContainer>
        {data?.map((partydata: PartyData) => (
          <PartyList {...partydata}></PartyList>
        ))}
      </PartyListContainer>
    </Container>
  );
};

export default PartyState;
