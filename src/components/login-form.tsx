"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
export const LoginForm = () => {
    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        const formData = new FormData(evt.currentTarget as HTMLFormElement);
        

        const email = String(formData.get("email"));
        if(!email) return toast.error("Please enter your email");
        
        const password = String(formData.get("password"));
        if(!password) return toast.error("Please enter your password");
    
        await signIn.email(
            {
                email,
                password
            },
            {
                onRequest: () => {
                    toast.loading("Signing in...");
                },
                onSuccess: () => {
                    toast.dismiss();
                    toast.success("Signed in successfully!");
                },
                onResponse:() =>{},
                onError: (ctx) => {
                    toast.dismiss();
                    toast.error(ctx.error.message);
                }
            }
        )
    }
    return <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">

        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
            Sign In
        </Button>
    </form>;
}