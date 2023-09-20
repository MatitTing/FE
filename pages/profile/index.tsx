import styled from "@emotion/styled";
import ProfileTabs from "@components/profile/ProfileTab";
import ProfileInfo from "@components/profile/ProfileInfo";
import { DefaultHeader } from "@components/common/DefaultHeader";
import SettingIcon from "@components/icons/common/Setting.icon";
import { useRouter } from "next/router";
import BackButton from "@components/common/BackButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 45px;
  width: 100%;
  max-width: 768px;
  min-height: calc(100vh - 80px);
  /* div::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }
  div::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #666666;
    border: 4px solid white;
  } */
`;

const RightAreaContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 0 8px;
  align-items: center;
  cursor: pointer;
`;

const Profile = () => {
  const router = useRouter();

  const rightArea = () => {
    return (
      <RightAreaContainer
        onClick={() => {
          router.push("/setting");
        }}
      >
        {SettingIcon()}
      </RightAreaContainer>
    );
  };

  return (
    <Container>
      <DefaultHeader leftArea={BackButton()} rightArea={rightArea()} />
      <ProfileInfo />
      <ProfileTabs />
    </Container>
  );
};

export default Profile;
