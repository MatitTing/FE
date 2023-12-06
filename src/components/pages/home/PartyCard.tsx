import { DefaultText } from "@components/common/DefaultText";
import { MainIcon } from "@components/icons/common/Main.icon";
import styled from "@emotion/styled";
import Image from "next/image";
import { ColorToken } from "styles/Color";
import { MainPagePartyListResponse } from "types/main/MainPagePartyListResponse";
import partyDefaultThumbnail from "public/images/list/partyDefaultThumbnail.png";
import dayjs from "dayjs";

interface PartyCardProps {
  partyData: MainPagePartyListResponse;
  onClickPartyCard: (id: number) => void;
}

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid ${ColorToken.border};
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-top: 30px;
  cursor: pointer;
`;
const InformationSection = styled.section`
  padding: 8px 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Title = styled.div``;
const Description = styled.div``;
const OtherInformation = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImageSection = styled.section`
  width: 100%;
  height: 100%;
`;

export const PartyCard = ({ partyData, onClickPartyCard }: PartyCardProps) => {
  const {
    address,
    age,
    gender,
    menu,
    thumbnail,
    participate,
    partyTime,
    partyTitle,
    totalParticipate,
    partyId,
  } = partyData;

  const onClick = () => {
    onClickPartyCard(partyId);
  };

  return (
    <Container onClick={onClick}>
      <ImageSection>
        {thumbnail ? (
          <Image
            width={500}
            height={300}
            src={thumbnail}
            alt={"party-image"}
            style={{
              objectFit: "cover",
            }}
          />
        ) : (
          <Image
            width={500}
            height={300}
            src={partyDefaultThumbnail}
            alt={"party-image"}
            style={{
              objectFit: "cover",
            }}
          />
        )}
      </ImageSection>
      <InformationSection>
        <Title>
          <DefaultText text={partyTitle} size={24} weight={700} />
        </Title>
        <Description>
          <DefaultText text={menu} size={15} weight={500} />
        </Description>
        <OtherInformation>
          <DefaultText
            text={`${dayjs(partyTime).format("YYYY-MM-MM / HH:MM")}`}
            size={15}
            weight={500}
          />
          <DefaultText text={address} size={15} weight={500} />
          <DefaultText
            text={`${gender === "ALL" ? "" : "여성전용"}`}
            size={15}
            weight={500}
          />
          <DefaultText
            text={`현재 인원수:${participate}/${totalParticipate}`}
            size={15}
            weight={500}
          />
        </OtherInformation>
      </InformationSection>
    </Container>
  );
};
