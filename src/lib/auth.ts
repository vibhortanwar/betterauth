import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "./argon2";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
        autoSignIn: false,
        password: {
            hash: hashPassword,
            verify: verifyPassword,
        }
    },
    session: {
        expiresIn: 15 * 24 * 60 * 60,
    },
    advanced: {
        database: {
            generateId: false,
        },
    },
    plugins: [nextCookies()],
});