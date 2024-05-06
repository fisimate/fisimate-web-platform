"use client";
import Sidebar from "@/components/Sidebar";
import { useAuthStore } from "@/stores/app-store";

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="">
      <Sidebar />
      <h1>{JSON.stringify(user)}</h1>
    </div>
  );
}
