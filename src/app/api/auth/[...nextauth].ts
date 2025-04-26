import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userID: { label: "userID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { userID, password } = credentials as {
          userID: string;
          password: string;
        };

        // 🔐 Replace this with your actual user validation logic
        if (userID === "testUser" && password === "secret123") {
          return {
            id: "1",
            name: "TestUser",
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin", // Optional custom page
  },
  secret: process.env.NEXTAUTH_SECRET,
});
