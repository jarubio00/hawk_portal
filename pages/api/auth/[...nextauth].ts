import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import md5 from "md5";
import { format, subHours, addHours, addDays } from "date-fns";
//import { userActivityRegister } from "@/app/api/utils/activity";

import prisma from "@/app/libs/prismadb";
import { DateTimeField } from "@mui/x-date-pickers";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials) {
        console.log("creds: ", credentials);
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            checklist: true,
          },
        });

        //console.log("user prisma: ", user);

        //console.log(credentials.password);

        if (!user || !user?.hashedPassword) {
          throw new Error("Usuario inválido");
        }

        let passToCompare = credentials.password;
        let isCorrectPassword = false;

        if (user.passwordType === "md5") {
          passToCompare = md5(credentials.password);
          isCorrectPassword = user.md5Pass === passToCompare;
        } else {
          isCorrectPassword = await bcrypt.compare(
            passToCompare,
            user.hashedPassword
          );
        }

        if (!isCorrectPassword) {
          throw new Error("Contraseña incorrecta");
        }
        const hoyUTC = new Date();
        const hoy = subHours(hoyUTC, 6);
        if (!user?.checklist?.firstLogin) {
          console.log("Capturar first login");
          const flogin = await prisma.clientesChecklist.update({
            where: {
              clienteEmail: user?.email,
            },
            data: {
              firstLogin: true,
              firstLoginAt: hoy,
            },
          });
          //const activity = await userActivityRegister(user.id, 2);
        } else {
          //const activity = await userActivityRegister(user.id, 3);
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return "/auth/login";
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
