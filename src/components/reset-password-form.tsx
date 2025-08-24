"use client"

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { resetPassword } from "@/lib/auth-client";

interface ResetPasswordFormProps {
    token: string;
}
export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        const formData = new FormData(evt.currentTarget as HTMLFormElement);
        const password = String(formData.get("password"));

        if (!password) return toast.error("Password is required");

        const confirmPassword = String(formData.get("confirmPassword"));
        if (password !== confirmPassword) return toast.error("Passwords do not match");

        await resetPassword({
            newPassword: password,
            token,
            fetchOptions: {
                onRequest: () => {
                    setIsPending(true);
                },
                onResponse: () => {
                    setIsPending(false);
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                },
                onSuccess: () => {
                    toast.success("Password reset successfully!");
                    router.push("/auth/login");
                }
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input type="password" id="password" name='password' />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input type="password" id="confirmPassword" name='confirmPassword' />
            </div>
            <Button type="submit" disabled={isPending}>
                Reset Password
            </Button>
        </form>
    );
};
