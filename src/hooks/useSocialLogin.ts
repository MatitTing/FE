import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import postLogin from "src/api/postLogin";
import { string } from "yup";

declare global {
  interface Window {
    naver: any;
    Kakao: any;
  }
}

interface SocialLoginInformationType {
  code: string;
  state?: string;
  loginType: "NAVER" | "KAKAO";
}

const useSocialLogin = () => {
  const { replace, query } = useRouter();
  const { code, state } = query;

  const { mutate: processLogin } = useMutation({ mutationFn: postLogin });

  useEffect(() => {
    if (code && state) {
      processLogin(
        {
          code: String(code),
          oauthProvider: "NAVER",
          state: String(state),
        },
        {
          onSuccess(data, variables, context) {
            if (data.newUserId) {
              replace("/signup", {
                query: {
                  newUserId: data.newUserId,
                },
              });
            }
          },
        }
      );
      return;
    } else if (code && !state) {
      processLogin(
        { code: String(code), oauthProvider: "KAKAO" },
        {
          onSuccess(data, variables, context) {
            if (data.newUserId) {
              replace("/signup", {
                query: {
                  newUserId: data.newUserId,
                },
              });
            }
          },
        }
      );
      return;
    }
  }, [code, processLogin, replace, state]);

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.KAKAO_KEY);
    }
  }, []);
};

export default useSocialLogin;
