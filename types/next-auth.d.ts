import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      workspaceId: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role: string
    workspaceId: string
  }
}
