import Google from "next-auth/providers/google";

import type { NextAuthOptions as NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from '@/db/prisma'

export const nextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    error: '/error',
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }),
  ],
  callbacks: {
    async signIn() {
      return true
    },
    async redirect({ url }) {
      return '/q'
    },
    async session({ session, token, user }) {
      if (session?.user) session.user.id = user.id;
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  },
  session: {
    maxAge: 180 * 24 * 60 * 60,
  }
} satisfies NextAuthConfig


declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NEXTAUTH_SECRET: string
      AUTH_GOOGLE_ID: string
      AUTH_GOOGLE_SECRET: string
    }
  }
}
