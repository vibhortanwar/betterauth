import { ReturnButton } from "@/components/return-button";

export default async function Page() {
    return <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
        <div className="space-y-8">
            <ReturnButton href='/auth/login' label="Login" />
            <h1 className="text-3xl font-bold">Success</h1>
        </div>

        <p className="text-muted-foreground">
            Success! You have sent a password reset link to your email!
        </p>
    </div>
}