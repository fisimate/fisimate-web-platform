"use client";
import { useGetSimulations } from "@/hooks/useSImulation";
import { Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";

export default function ExamBank() {
  const tokenCookie = Cookies.get("token");
  const token = tokenCookie ? JSON.parse(tokenCookie)?.access_token : null;

  const { data, isLoading } = useGetSimulations(token);

  return (
    <div className="">
      {isLoading && <Spinner />}
      {data?.data?.data.map((item, i) => {
        return <p>{JSON.stringify(item)}</p>;
      })}
    </div>
  );
}
