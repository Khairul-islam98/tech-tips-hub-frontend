import axiosInstance from "@/lib/axios-instance";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile, account }: any) {
      try {
        if (!profile || !account) {
          console.log("Profile or account missing");
          return false;
        }
        if (account?.provider === "google") {
          console.log("Profile:", profile);
          const { data } = await axiosInstance.post("/auth/login", {
            name: profile.name,
            email: profile.email,
            profilePhoto: profile.image,
          });
          console.log("API Response:", data);
          if (data?.data?.accessToken) {
            cookies().set("accessToken", data.data.accessToken);
            return true;
          } else {
            console.log("No access token found in response");
            return false;
          }
        }
        console.log("Account provider is not Google");
        return false;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
});

export { handler as GET, handler as POST };
