import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
     providers: [
          GoogleProvider({
               clientId: process.env.GOOGLE_ID,
               clientSecret: process.env.GOOGLE_SECRET,
          }),
     ],

     session: {
          jwt: true,
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

               return token;
          },

          async session({ session, token }) {
               session.user.id = token.id;
               session.user.email = token.email;
               session.user.name = token.name;
               session.user.picture = token.picture;
               return session;
          },
     },
});
