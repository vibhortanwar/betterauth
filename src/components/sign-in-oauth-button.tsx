"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export const SignInOAuthButton = ({signUp}: {signUp?: boolean}) => {
    const [isPending, setIsPending] = useState(false);
    async function handleClick(){
        await signIn.social({
            provider: "google",
            callbackURL: "/profile",
            errorCallbackURL: "/auth/login/error",
            fetchOptions: {
                onRequest:() => {
                    setIsPending(true);
                },
                onResponse:() => {
                    setIsPending(false);
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                }
            }
        })
    }

    const action = signUp ? "Up" : "In";
    const providerName = "Google";
    return <Button onClick={handleClick} disabled={isPending}>
        Sign {action} with {providerName}
    </Button>;
}