"use client";
import { useGetChapters } from "@/hooks/useChapter";
import { useGetToken } from "@/hooks/useToken";
import { Spinner } from "@chakra-ui/react";

export default function ExamBank() {
  const token = useGetToken();

  const { data, isLoading } = useGetChapters({ token });

  return (
    <div className="">
      {isLoading && <Spinner />}
      {data?.data?.data.map((item, i) => {
        return <p key={i}>{JSON.stringify(item)}</p>;
      })}
    </div>
  );
}
