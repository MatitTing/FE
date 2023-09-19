import styled from "@emotion/styled";
import ProfileTabs from "@components/profile/profiletab";
import ProfileInfo from "@components/profile/profileinfo";
import { DefaultHeader } from "@components/common/DefaultHeader";
import BackIcon from "@components/icons/common/close";

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
