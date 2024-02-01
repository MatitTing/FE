import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";

declare global {
  interface Window {
    naver: any;
    Kakao: any;
  }
}

const useSocialLoginInit = () => {
  const [token, setToken] = useState<string>();
  const { replace, query } = useRouter();
  const { code } = query;
  const handleNaverInit = useCallback(() => {
    const naver = window.naver;
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.NAVER_CLIENT_ID, //ClientID
      callbackUrl: process.env.NAVER_CALLBACK_URL, // Callback URL
      callbackHandle: true,
      loginButton: {
        color: "green", // 색상
        type: 1, // 버튼 크기
        height: "60", // 버튼 높이
      },
    });
    naverLogin.init();
  }, []);

  useEffect(() => {
    if (window.location.href.split("=")[1]) {
      setToken(window.location.href.split("=")[1].split("&")[0]);
      replace(
        "/signin",
        {},
        {
          shallow: true,
        }
      );
    }
  }, [replace]);

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.KAKAO_KEY);
    }
  }, []);
  useEffect(() => {
    if (code) {
      setToken(String(code));
      replace(
        "/signin",
        {},
        {
          shallow: true,
        }
      );
    }
  }, [code, replace]);

  useEffect(() => {
    handleNaverInit();
  }, [handleNaverInit]);

  return { token };
};

export default useSocialLoginInit;
