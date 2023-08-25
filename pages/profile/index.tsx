import styled from "@emotion/styled";
import Header from "src/component/profile/header";
import { useState } from "react";
import ProfileTabs from "src/component/profile/profiletab";
import MannerDegree from "src/component/profile/mannerdegree";
import LocationIcon from "@assets/icons/profile/location";
import GenderIcon from "@assets/icons/profile/gender";
import InfoIcon from "@assets/icons/profile/info";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  div::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  div::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #666666;
  }
`;
const Main = styled.div`
  height: calc(100% - 136px);
  overflow-y: auto;
`;

const userdata = {
  name: "username",
  locaton: "서울광역시",
  gender: "남성",
  age: "20대",
  mannerdegree: 30,
};

const Profile = () => {
  return (
    <Container>
      <Header />
      <Main>
        <ProfileInfo userdata={userdata} />
        <ProfileTabs></ProfileTabs>
      </Main>
    </Container>
  );
};

export default Profile;
