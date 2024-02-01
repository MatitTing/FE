import styled from "@emotion/styled";
import { DefaultHeader } from "@components/common/DefaultHeader";
import AuthButton from "@components/signin/SigninButton";
import { HeaderBackButton } from "@components/common/HeaderBackButton";
import { Color } from "styles/Color";
import useSocialLoginInit from "@hooks/useSocialLoginInit";
import { useCallback, useRef } from "react";
import Head from "next/head";
import Script from "next/script";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 45px;
  min-height: calc(100vh - 45px);
  width: 100%;
  max-width: 768px;
  background: ${Color.Background};
`;

const AuthButtonList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const Main = styled.div`
  display: flex;
  width: 100%;
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

const NaverInvisibleButton = styled.button`
  display: none;
`;

const Profile = () => {
  const naverRef = useRef<HTMLButtonElement>(null);
  const { token } = useSocialLoginInit();

  console.log(token);

  const handleNaverLogin = () => {
    (naverRef.current?.children[0] as HTMLButtonElement).click();
  };

  const onClickKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/signin",
    });
  };

  return (
    <Container>
      <DefaultHeader leftArea={<HeaderBackButton />} />
      <Main>
        <Logo>Maiting</Logo>
        <AuthButtonList>
          <AuthButton
            src="/images/oauth/kakao.png"
            alt="카카오"
            bgColor="#f9e000"
            color="#3b2214"
            onClick={onClickKakao}
          />
          <NaverInvisibleButton ref={naverRef} id="naverIdLogin" />
          <AuthButton
            src="/images/oauth/naver.png"
            alt="네이버"
            bgColor="#03C75A"
            color="#ffffff"
            onClick={handleNaverLogin}
          />
        </AuthButtonList>
      </Main>
    </Container>
  );
};
export default Profile;
