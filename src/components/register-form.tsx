"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import React from "react";
import { useRouter } from "next/navigation";
import { signUpEmailAction } from "@/actions/sign-up-email.action";
export const RegisterForm = () => {
    const [isPending, setIsPending] = React.useState(false);
    const router = useRouter();
    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        setIsPending(true);
        const formData = new FormData(evt.currentTarget as HTMLFormElement);
        const  { error } = await signUpEmailAction(formData);
        if (error) {
            toast.error(error);
            setIsPending(false);
        }else{
           router.push("/auth/register/success");
           toast.success("Registration successful! Please check your email to verify your account.");
        }
    }
    return <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
        <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" />
        </div>

        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
            Register
        </Button>
    </form>;
}