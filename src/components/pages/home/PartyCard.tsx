import { DefaultText } from "@components/common/DefaultText";
import styled from "@emotion/styled";
import Image from "next/image";
import { ColorToken } from "styles/Color";
import { PartyListDataType } from "./HomeList";

interface PartyCardProps {
  partyData: PartyListDataType;
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

export const PartyCard = ({ partyData }: PartyCardProps) => {
  return (
    <Container>
      <ImageSection>
        <Image
          width={500}
          height={300}
          layout="responsive"
          src={partyData.image}
          placeholder="blur"
          blurDataURL={partyData.image}
          alt={"party-image"}
          objectFit="cover"
        />
      </ImageSection>
      <InformationSection>
        <Title>
          <DefaultText text={partyData.title} size={24} weight={700} />
        </Title>
        <Description>
          <DefaultText text={partyData.description} size={15} weight={500} />
        </Description>
        <OtherInformation>
          <DefaultText
            text={`${partyData.date} ${partyData.time}`}
            size={15}
            weight={500}
          />
          <DefaultText text={partyData.location} size={15} weight={500} />
          <DefaultText
            text={`${partyData.isWomenOnly ? "여성전용" : ""}`}
            size={15}
            weight={500}
          />
          <DefaultText
            text={`현재 인원수/${partyData.maxPeople}`}
            size={15}
            weight={500}
          />
        </OtherInformation>
      </InformationSection>
    </Container>
  );
};
