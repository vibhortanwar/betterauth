import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "./argon2";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { getValidDomains, normalizeName } from "@/lib/utils";
import { sendEmailAction } from "@/actions/send-email.actions";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    socialProviders:{
        google: {
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
        },
    },
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
        autoSignIn: false,
        password: {
            hash: hashPassword,
            verify: verifyPassword,
        },requireEmailVerification: true,
        sendResetPassword: async ({ user, url }) => {
            await sendEmailAction({
                to: user.email,
                subject: "Reset Your Password",
                meta: {
                    description: "Please reset your password by clicking the link below.",
                    link: String(url),
                }
            })
        }
    },
    emailVerification: {
        sendOnSignUp: true,
        expiresIn: 60 * 60,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            const link = new URL(url);
            link.searchParams.set("callbackURL", "/auth/verify");
            await sendEmailAction(
                {
                    to: user.email,
                    subject: "Verify Your Email Address",
                    meta: {
                        description: "Please verify your email address by clicking the link below.",
                        link: String(link),
                    }
                }
            )
            
        }
    },
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path === "/sign-up/email") {
                const email = String(ctx.body.email);
                const domain = email.split("@")[1];

                const VALID_DOMAINS = getValidDomains();
                if(!VALID_DOMAINS.includes(domain)){
                    throw new APIError("BAD_REQUEST", {
                        message: "Invalid domain. Please use a valid email."
                    })
                }
                const name = normalizeName(ctx.body.name);

                ctx.body.name = name;
                
                return {
                    context: ctx
                }
            }
        }),
    },
    session: {
        expiresIn: 15 * 24 * 60 * 60,
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60
        }
    },
    account: {
        accountLinking: {
            enabled: false,
        },
    },
    advanced: {
        database: {
            generateId: false,
        },
    },
    plugins: [nextCookies()],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";