// auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true, // Add this line
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        token: { label: "Token", type: "text" },
        user: { label: "User", type: "text" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.token) return null;
          return JSON.parse(credentials.user as string);
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }
      if (account?.provider === "google" && account.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      session.accessToken = token.accessToken as any;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
});