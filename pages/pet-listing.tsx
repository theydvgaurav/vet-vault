"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { PetList } from "@/components/pets/pet-list";

export default function PetsPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen  p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-500">Pet Records</h1>
          </div>
          <PetList />
        </div>
      </main>
    </ProtectedRoute>
  );
}