import NextAuth from "next-auth"
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
   
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    
    })
  ],
}

export default NextAuth(authOptions)