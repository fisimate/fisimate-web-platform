"use client";
import { useGetSimulations } from "@/hooks/useSImulation";
import { Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";

export default function ExamBank() {
  const token = JSON.parse(Cookies.get("token")).access_token;

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
