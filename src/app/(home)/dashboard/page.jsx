"use client";
import { useAuthStore } from "@/stores/app-store";

export default function Dashboard() {
  const { user } = useAuthStore();

  return <h1>{JSON.stringify(user)}</h1>;
}
