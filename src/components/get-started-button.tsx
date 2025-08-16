"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "./ui/button";
import Link from "next/dist/client/link";

export function GetStartedButton() {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <Button size="lg" className="opacity-50">
                Get Started
            </Button>
        );
    }

    const href = session ? "/profile" : "/auth/login";

    return (
        <div className="flex flex-col items-center gap-4">    
            <Button size="lg" asChild>
                <Link href={href}>Get Started</Link>
            </Button>

            {session && <p>Welcome back, {session.user.name}! </p>}
        </div>
    );
}