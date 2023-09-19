import styled from "@emotion/styled";
import { DefaultHeader } from "@components/common/DefaultHeader";
import BackIcon from "@components/icons/common/close";
import AuthButton from "@components/signin/signinbutton";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 45px;
  align-items: center;
`;

const AuthButtonList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const SignupLink = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: row-reverse;
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
`;

const leftArea = () => {
  return <HeaderAreaContainer>{BackIcon()}</HeaderAreaContainer>;
};

const Profile = () => {
  return (
    <Container>
      <DefaultHeader leftArea={leftArea()} />
      <Main>
        <Logo>Maiting</Logo>
        <AuthButtonList>
          <AuthButton
            src="/images/oauth/kakao.png"
            alt="카카오"
            type="signup"
            bgColor="#f9e000"
            color="#3b2214"
            provider="kakao"
          />
          <AuthButton
            src=""
            alt="네이버"
            type="signup"
            bgColor="#17b75e"
            color="#ffffff"
            provider="naver"
          />
        </AuthButtonList>
        <SignupLink>
          <Link href={"/signin"}>로그인</Link>
        </SignupLink>
      </Main>
    </Container>
  );
};

export default Profile;
