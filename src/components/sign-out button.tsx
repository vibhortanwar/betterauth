"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/dist/client/components/navigation"
import { toast } from "sonner";

export const SignOutButton = () => {
    const router = useRouter();
    async function handleClick() {
        await signOut({
            fetchOptions: {
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
                onSuccess: () => {
                    router.push("/auth/login"); // redirect to login page
                },
            },
        });
    }
    return <Button onClick={handleClick}>Sign Out</Button>
}   