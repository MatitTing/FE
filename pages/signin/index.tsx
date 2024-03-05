import { DefaultHeader } from "@components/common/DefaultHeader";
import { HeaderBackButton } from "@components/common/HeaderBackButton";
import AuthButton from "@components/signin/SigninButton";
import styled from "@emotion/styled";
import useSocialLoginInit from "@hooks/useSocialLogin";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
import Link from "next/link";
import { Color } from "styles/Color";

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

const Profile = () => {
  const onClickKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/signin",
    });
  };
  useSocialLoginInit();

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
          <Link
            href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&state=matitting&redirect_uri=${process.env.NAVER_CALLBACK_URL}`}
          >
            <AuthButton
              src="/images/oauth/naver.png"
              alt="네이버"
              bgColor="#03C75A"
              color="#ffffff"
            />
          </Link>
        </AuthButtonList>
      </Main>
    </Container>
  );
};
export default Profile;
