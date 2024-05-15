import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
     providers: [
          GoogleProvider({
               clientId: process.env.GOOGLE_ID,
               clientSecret: process.env.GOOGLE_SECRET,
          }),
     ],

     // adapter: PrismaAdapter(prisma),

     session: {
          strategy: "jwt",
     },

     jwt: {
          secret: process.env.JWT_SECRET,
     },
     callbacks: {
          async jwt({ token, user }) {
               if (user) {
                    token.id = user.id;
                    token.email = user.email;
                    token.name = user.name;
                    token.picture = user.image;
               }
               console.log("JWT TOKEN:" + token);
               return token;
          },

          async session({ session, token }) {
               session.user.id = token.id;
               session.user.email = token.email;
               session.user.name = token.name;
               session.user.picture = token.picture;
               console.log("SESSION:" + session);
               return session;
          },
     },
});
