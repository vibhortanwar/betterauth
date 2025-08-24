"use client"
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signInEmailAction } from "@/actions/sign-in-email.action";
import Link from "next/link";
export const LoginForm = () => {
    const [isPending, setIsPending] = React.useState(false);
    const router = useRouter();
    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        setIsPending(true);
        const formData = new FormData(evt.currentTarget as HTMLFormElement);
        const  { error } = await signInEmailAction(formData);
        if (error) {
            toast.error(error);
            setIsPending(false);
        }else{
            router.push("/profile");
            toast.success("Login successful!");
        }
    }
    return <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">

        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
            <div className="flex justify-between items-center gap-2">
                <Label htmlFor="password">Password</Label>
                <Link href="/auth/forgot-password" className="text-sm italic text-muted-foreground hover:text-foreground">
                    Forgot Password?
                </Link>
            </div>
            <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
            Sign In
        </Button>
    </form>;
}