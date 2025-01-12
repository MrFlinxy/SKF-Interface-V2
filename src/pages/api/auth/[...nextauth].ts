import environment from "@/config/environment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.service";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1,
  },
  secret: environment.SECRET_KEY,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
      ): Promise<UserExtended | null> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const result = await authServices.login({
          email,
          password,
        });

        const idToken = result.data.idToken;
        const refreshToken = result.data.refreshToken;

        const userProfile = await authServices.getProfileWithToken(idToken);
        const userData = await authServices.getUserDataWithEmail(idToken);
        const user = userProfile.data;

        if (
          idToken &&
          result.status === 200 &&
          user.user_id &&
          userProfile.status === 200
        ) {
          user.idToken = idToken;
          user.refreshToken = refreshToken;
          user.data = userData.data;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtended;
    }) {
      session.user = token.user;
      session.idToken = token.user?.idToken;
      session.refreshToken = token.user?.refreshToken;
      return session;
    },
  },
});
