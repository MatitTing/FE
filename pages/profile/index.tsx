import styled from "@emotion/styled";
import Header from "@components/profile/header";
import ProfileTabs from "@components/profile/profiletab";
import MannerDegree from "@components/profile/mannerdegree";
import LocationIcon from "@components/icons/profile/location";
import GenderIcon from "@components/icons/profile/gender";
import InfoIcon from "@components/icons/toast/info";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Main = styled.div`
  height: calc(100% - 136px);
  overflow-y: auto;
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
const ProfileImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
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

const userdata = {
  name: "username",
  locaton: "서울광역시",
  gender: "남성",
  age: "20대",
  mannerdegree: "30",
};

const Profile = () => {
  return (
    <Container>
      <Header></Header>
      <Main>
        <ProfileInfo>
          <ProfileImgContainer>
            <ProfileImg src="/images/profile/profile.png"></ProfileImg>
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
      </Main>
    </Container>
  );
};

export default Profile;
