"use server"

import { auth, ErrorCode } from "@/lib/auth";
import { APIError} from "better-auth/api"

export async function signUpEmailAction(formData: FormData){
    const name = String(formData.get("name"));
    if(!name) return { error: "Please enter your name" };

    const email = String(formData.get("email"));
    if(!email) return { error: "Please enter your email" };

    const password = String(formData.get("password"));
    if(!password) return { error: "Please enter your password" };

    try {
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            },
        });
        return { error: null };
    } catch (error) {
        if (error instanceof APIError) {
            const errorCode = error.body ? (error.body.code as ErrorCode) : "UNKNOWN";

            switch (errorCode) {
                default:
                    return { error: error.message};

            }
        }
        return { error: "Oops! Something went wrong." };
    }
    return { error: "Internal Server Error" };
}