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
`;
const ProfileInfo = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  flex-direction: row;
`;
const ProfileImgContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
  }
`;

const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  .userinfo {
    color: #4b4b4b;
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-bottom: 8px;
  }
  .name {
    font-size: 48px;
    margin-bottom: 16px;
  }
  span {
    margin-left: 4px;
  }
`;

const tabList = [
  {
    title: "파티현황",
    state: "partystate",
  },
  {
    title: "설정",
    state: "setting",
  },
];

const userdata = {
  name: "username",
  locaton: "서울광역시",
  gender: "남성",
  age: "20대",
  mannerdegree: "30",
};

const Profile = () => {
  const [tabstate, setTabstate] = useState<string>("partystate");

  return (
    <Container>
      <Header></Header>
      <ProfileInfo>
        <ProfileImgContainer>
          <img src="/images/profile/profile.png"></img>
          {/* <ProfileImg></ProfileImg> */}
        </ProfileImgContainer>
        <ProfileDetail>
          <div className="userinfo">
            <div className="location">
              <LocationIcon />
              <span>{userdata.locaton}</span>
            </div>
            <div className="gender">
              <GenderIcon />
              <span>{userdata.gender}</span>
            </div>
            <div className="age">
              <InfoIcon />
              <span>{userdata.age}</span>
            </div>
          </div>
          <div className="name">{userdata.name} </div>
          <MannerDegree degree={userdata.mannerdegree}></MannerDegree>
        </ProfileDetail>
      </ProfileInfo>
      <ProfileTabs></ProfileTabs>
    </Container>
  );
};

export default Profile;
