import NextAuth, { NextAuthOptions } from "next-auth";

import KakaoProvider from "next-auth/providers/kakao";

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }): Promise<boolean | string> {
      try {
        return true;
      } catch (error: any) {}
    },
  },
};

export default NextAuth(authOptions);
