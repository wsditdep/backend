import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/utils/connection";
import { User } from "@/modals/User";

const login = async (credentials) => {
    try {
        await connectToDB();
        const user = await User.findOne({ username: credentials.username });

        if (!user) {
            return null
        }

        if (!user?.status) {
            return null
        }

        if (user.role === "user" || user.role === "practice" || user.role === "agent") {
            return null;
        }

        const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
        );

        if (!isPasswordCorrect) {
            return null
        }

        return user;
    } catch (err) {
        console.log(err);
    }
};

export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (err) {
                    return null;
                }
            },
        }),
    ],
    // ADD ADDITIONAL INFORMATION TO SESSION
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            const user = token.user
            session.user = user
            return session
        }
    }
});