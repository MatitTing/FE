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
  padding-top: 45px;
  width: 100%;
  height: 100%;
  div::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }
  div::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #666666;
    border: 4px solid white;
  }
`;
const Main = styled.div`
  height: calc(100% - 76px);
  overflow-y: scroll;
`;

const HeaderAreaContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 0 15px;
  align-items: center;
`;

const leftArea = () => {
  return <HeaderAreaContainer>{BackIcon()}</HeaderAreaContainer>;
};

const Profile = () => {
  return (
    <Container>
      <DefaultHeader leftArea={leftArea()} />
      <Main id="main">
        <ProfileInfo />
        <ProfileTabs />
      </Main>
    </Container>
  );
};

export default Profile;
