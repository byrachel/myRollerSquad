import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith@mail.com" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        try {
          const login = await axios.post(
            "http://localhost:3000/api/auth/login",
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: {
                accept: "*/*",
                "Content-Type": "application/json",
              },
            }
          );

          if (!login && !login.data.user) return null;
          return login.data.user;
        } catch (error) {
          console.log(error);
          console.log(error.response.data.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (!token || !token.user) return;
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
