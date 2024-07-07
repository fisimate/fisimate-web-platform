"use client";
import Spinner from "@/components/Spinner";
import { useGetLeaderboard } from "@/hooks/useDashboard";
import { useGetToken } from "@/hooks/useToken";
import React from "react";

export default function Leaderboard() {
  const token = useGetToken();

  const { data, isLoading, isLoadingError } = useGetLeaderboard({ token });

  return (
    <React.Fragment>
      {isLoading && <Spinner />}
      <p>{JSON.stringify(data?.data?.data)}</p>
    </React.Fragment>
  );
}
