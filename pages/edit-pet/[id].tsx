"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useRouter } from "next/router"
import { EditPetForm } from "@/components/pets/edit-pet-form";

export default function EditPets() {
    const { query } = useRouter();
    return (
        <ProtectedRoute>
            <main className="min-h-screen  p-4">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-green-500">Edit Pet</h1>
                    </div>
                    <EditPetForm petId={query.id} />
                </div>
            </main>
        </ProtectedRoute>
    );
}