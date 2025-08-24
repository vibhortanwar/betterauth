import { ReturnButton } from "@/components/return-button";
import { SendVerificationEmailForm } from "@/components/send-verification-email-form";
import { redirect } from "next/dist/client/components/navigation";

interface PageProps {
    searchParams: Promise<{error: string}>;
}

export default async function Page({searchParams}: PageProps) {
    const error = (await searchParams).error; 
    if(!error) redirect("/profile")
    return <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
        <div className="space-y-8">
            <ReturnButton href='/auth/login' label="Login" />
            <h1 className="text-3xl font-bold">Verify Error</h1>
        </div>

        <p className="text-destructive">
            {error === "invalid_token" || error === "token_expired" 
            ? "Your token is invalid or has expired please request a new one."
            : error === "email_not_verified" 
            ? "Please verify your email address." 
            : "Oops! Something went wrong during verification. Please try again."}
        </p>

        <SendVerificationEmailForm />
    </div>
}