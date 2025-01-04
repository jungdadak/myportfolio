// app/auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID!,
			clientSecret: process.env.AUTH_GITHUB_SECRET!,
		}),
		Google({
			clientId: process.env.AUTH_GOOGLE_ID!,
			clientSecret: process.env.AUTH_GOOGLE_SECRET!,
		}),
		Kakao({
			clientId: process.env.AUTH_KAKAO_ID!,
			clientSecret: process.env.AUTH_KAKAO_SECRET!,
		}),
		Naver({
			clientId: process.env.AUTH_NAVER_ID!,
			clientSecret: process.env.AUTH_NAVER_SECRET!,
		}),
	],
	secret: process.env.AUTH_SECRET,
});
