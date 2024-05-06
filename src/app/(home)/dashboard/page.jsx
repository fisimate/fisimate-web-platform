"use client";
import { useAuthStore } from "@/stores/app-store";

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="">
      <h1>{JSON.stringify(user)}</h1>
    </div>
  );
}
