import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", name: "Admin", email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth: session, request }) {
      const isAdmin = request.nextUrl.pathname.startsWith("/admin");
      const isLoginPage = request.nextUrl.pathname === "/admin/login";

      if (isLoginPage) return true;
      if (isAdmin) return !!session?.user;
      return true;
    },
  },
});
