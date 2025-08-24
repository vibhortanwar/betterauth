"use client"

import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/auth-client";

interface UpdateUserFormProps {
    name: string;
    image: string;
}
export const UpdateUserForm = (
    {name, image}: UpdateUserFormProps
) => {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();
    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        const formData = new FormData(evt.target as HTMLFormElement);
        const nameValue = String(formData.get("name")).trim();
        const imageValue = String(formData.get("image")).trim();

        if (!nameValue && !imageValue) {
            return toast.error("Please provide a name or image URL to update.");
        }

        // Only include fields that have values
        const updateData: any = {};
        if (nameValue) updateData.name = nameValue;
        if (imageValue) updateData.image = imageValue;

        await updateUser({ 
            ...updateData,
            fetchOptions: {
                onRequest: () => {
                    setIsPending(true);
                },
                onResponse: () => {
                    setIsPending(false);
                },
                onSuccess: () => {
                    toast.success("User updated successfully!");
                    (evt.target as HTMLFormElement).reset();
                    router.refresh();
                }
            }
        });
    }

    return (
        <form className="max-w-sm w-full space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Name" />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input type="url" id="image" name="image" placeholder="Image URL" />
            </div>

            <Button type="submit" disabled={isPending}>
                Update User
            </Button>
        </form>
    )
}