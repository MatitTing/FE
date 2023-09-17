import styled from "@emotion/styled";
import Header from "@components/profile/header";
import ProfileTabs from "@components/profile/profiletab";
import ProfileInfo from "@components/profile/profileinfo";

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
