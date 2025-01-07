"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { AddPetForm } from "@/components/pets/add-pet-form";

export default function AddPetPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen  p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl text-black font-bold text-black mb-6">Add New Pet</h1>
          <AddPetForm />
        </div>
      </main>
    </ProtectedRoute>
  );
}
