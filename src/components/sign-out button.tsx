"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation"
import { toast } from "sonner";
import React from "react";

export const SignOutButton = () => {
    const [isPending, setIsPending] = React.useState(false);
    const router = useRouter();
    async function handleClick() {
        await signOut({
            fetchOptions: {
                onRequest: () => {
                    setIsPending(true);
                },
                onResponse:() => {
                    setIsPending(false);
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
                onSuccess: () => {
                    toast.success("Logged out successfully!");
                    router.push("/auth/login");
                },
            },
        });
    }
    return <Button onClick={handleClick} variant="destructive" disabled={isPending}>Sign Out</Button>
}   