import styled from "@emotion/styled";
import { DefaultHeader } from "@components/common/DefaultHeader";
import AuthButton from "@components/signin/SigninButton";
import { HeaderBackButton } from "@components/common/HeaderBackButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 45px;
  min-height: calc(100vh - 80px);
  width: 100%;
  max-width: 768px;
`;

const AuthButtonList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const Main = styled.div`
  display: flex;
  width: 400px;
  height: calc(100% - 76px);
  overflow-y: auto;
  flex-direction: column;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 40px;
`;

const HeaderAreaContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 0 15px;
  align-items: center;
  cursor: pointer;
`;

const Profile = () => {
  const leftArea = () => {
    return (
      <HeaderAreaContainer>
        <HeaderBackButton />
      </HeaderAreaContainer>
    );
  };

  return (
    <Container>
      <DefaultHeader leftArea={leftArea()} />
      <Main>
        <Logo>Maiting</Logo>
        <AuthButtonList>
          <AuthButton
            src="/images/oauth/kakao.png"
            alt="카카오"
            type="signin"
            bgColor="#f9e000"
            color="#3b2214"
            provider="kakao"
          />
          <AuthButton
            src=""
            alt="네이버"
            type="signin"
            bgColor="#17b75e"
            color="#ffffff"
            provider="naver"
          />
        </AuthButtonList>
      </Main>
    </Container>
  );
};

export default Profile;
