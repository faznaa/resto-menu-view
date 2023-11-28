import NextAuth from "next-auth"
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvider<GoogleProfile>({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
}

export default NextAuth(authOptions)