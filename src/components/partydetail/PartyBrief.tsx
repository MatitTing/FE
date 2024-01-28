import styled from "@emotion/styled";
import { DefaultText } from "@components/common/DefaultText";
import ViewcountIcon from "@components/icons/profile/Viewcount.icon";
import Divider from "@mui/material/Divider";
import PersonIcon from "@components/icons/profile/Person.icon";
import InfoIcon from "@components/icons/profile/Info.icon";
import GenderIcon from "@components/icons/profile/Gender.icon";
import { Fragment } from "react";
import RestaurantIcon from "@components/icons/profile/Restaurant.icon";

interface PartyBriefProps {
  partyTitle: string;
  hit: number;
  totalParticipant: number;
  participate: number;
  gender: string;
  age: string;
  category: string;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 20px;
  z-index: 99;
  background-color: white;
  border-radius: 12px;
`;
const PartyTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
  gap: 10px;
`;

const ViewcountContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const PartyConditionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

const PartyConditionBox = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
  gap: 10px;
`;

const PartyBrief = (data: PartyBriefProps) => {
  const {
    partyTitle,
    hit,
    totalParticipant,
    participate,
    gender,
    age,
    category,
  } = data;

  const genderDataConvert = (gender: string) => {
    const genderMap: { [key: string]: string } = {
      ALL: "모든성별",
      MALE: "남성만",
      FEMALE: "여성만",
    };
    return genderMap[gender] || "";
  };

  const ageDataConvert = (gender: string) => {
    const ageMap: { [key: string]: string } = {
      TWENTY: "20대",
      THIRTY: "30대",
      FOURTY: "40대 이상",
      ALL: "모든연령",
    };
    return ageMap[gender] || "";
  };

  const categoryDataConvert = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      KOREAN: "한식",
      WESTERN: "양식",
      JAPANESE: "일식",
      CHINESE: "중식",
      ETC: "기타",
    };
    return categoryMap[category] || "";
  };

  const PartyBriefData = [
    {
      id: "participant_count",
      icon: <PersonIcon />,
      content: `${participate.toString()}/${totalParticipant.toString()}명`,
    },
    {
      id: "gender_data",
      icon: <GenderIcon />,
      content: genderDataConvert(gender),
    },
    {
      id: "age_data",
      icon: <InfoIcon />,
      content: ageDataConvert(age),
    },
    {
      id: "category_data",
      icon: <RestaurantIcon />,
      content: categoryDataConvert(category),
    },
  ];

  return (
    <Container>
      <PartyTitle>
        <DefaultText text={partyTitle} size={24} weight={600} />
        <ViewcountContainer>
          <ViewcountIcon />
          <DefaultText text={hit.toString()} size={24} />
        </ViewcountContainer>
      </PartyTitle>
      <Divider />
      <PartyConditionContainer>
        {PartyBriefData.map(({ id, icon, content }, index) => (
          <Fragment key={id}>
            {index !== 0 && <Divider orientation="vertical" />}
            <PartyConditionBox>
              {icon}
              <DefaultText text={content} size={16} />
            </PartyConditionBox>
          </Fragment>
        ))}
      </PartyConditionContainer>
    </Container>
  );
};

export default PartyBrief;
