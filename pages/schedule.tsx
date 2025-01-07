"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import ScheduleList from "@/components/schedule/schedule-list";
export default function Schedule() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen  p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-black">Schedule</h1>
          </div>
          <ScheduleList/>
        </div>
      </main>
    </ProtectedRoute>
  );
}
