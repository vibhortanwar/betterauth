import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface ReturnButtonProps {
    href: string;
    label: string
}

export const ReturnButton = (
    { href, label }: ReturnButtonProps
) => {
    return <Button size='sm' asChild>
        <Link href={href}>
            <ArrowLeftIcon /> {label}
        </Link>
    </Button>
}