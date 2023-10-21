import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { DefaultHeader } from "@components/common/DefaultHeader";
import PartyInfo from "@components/partydetail/PartyInfo";
import { HeaderBackButton } from "@components/common/HeaderBackButton";
import PartyMap from "@components/partydetail/PartyMap";
import { DefaultButton } from "@components/common/DefaultButton";
import Image from "next/image";
import { useScroll } from "react-use";
import { useRef } from "react";
import { useRouter } from "next/router";
import { useGetPartyDetailMutation } from "@hooks/react-query/useGetPartyDetailMutation";

export interface PartyDetailDataType {
  position: {
    coords: {
      x: number;
      y: number;
    };
    address?: string;
  };
  description: {
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
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  max-width: 768px;
  overflow-y: scroll;
`;

const HeaderAreaContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 0 15px;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: auto;
  justify-content: center;
  padding: 40px 0;
`;

const BackGroundImgContainer = styled.div<{ scrollY: number }>`
  display: flex;
  width: 100%;
  min-height: 200px;
  justify-content: center;
  align-items: center;
  z-index: 8;
  transform: ${({ scrollY }) => `translateY(${scrollY * 0.4}px)`};
`;

const initailPartyDetailData = {
  position: {
    coords: {
      x: 33.5563,
      y: 126.79581,
    },
    address: "",
  },
  description: {
    partyTitle: "제목",
    partyContent: "파티 설명",
    status: "모집중",
    gender: "남성만",
    age: "2030",
    deadline: "",
    partyTime: "",
    totalParticipate: 6,
    participate: 3,
    thumbnail: "/images/profile/profilebackground.jpg",
    address: "서울특별시",
  },
};

const PartyDetail = () => {
  const scrollRef = useRef(null);
  const { y } = useScroll(scrollRef);

  const [partyDetailData, setPartyDetailData] = useState<PartyDetailDataType>(
    initailPartyDetailData
  );
  const { mutateAsync: getPartyDetailWithId } = useGetPartyDetailMutation();

  const router = useRouter();
  const { id } = router.query;

  const LeftArea = () => {
    return (
      <HeaderAreaContainer>
        <HeaderBackButton />
      </HeaderAreaContainer>
    );
  };

  const participateParty = () => {
    // 백엔드 확정후 추가
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getPartyDetailWithId({ id: id }).then((data) => {
      //백엔드 구조 확정 후 추가
    });
  }, [id]);

  return (
    <Container ref={scrollRef}>
      <DefaultHeader leftArea={<LeftArea />} />
      <BackGroundImgContainer scrollY={y}>
        <Image
          src="/images/profile/profilebackground.jpg"
          layout="fill"
          objectFit="cover"
        />
      </BackGroundImgContainer>
      <PartyInfo {...partyDetailData.description} />
      <PartyMap {...partyDetailData.position} />
      <ButtonContainer>
        <DefaultButton
          text={"참가신청"}
          onClick={participateParty}
          style={{
            width: "60%",
          }}
        />
      </ButtonContainer>
    </Container>
  );
};

export default PartyDetail;
