"use client";
import { useChapterQuery } from "@/hooks/useChapter";
import { Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";

export default function ExamBank() {
  const token = JSON.parse(Cookies.get("token")).access_token;

  const { data, isLoading } = useChapterQuery(token);

  return (
    <div className="">
      {isLoading && <Spinner />}
      {data?.data?.data.map((item, i) => {
        return <p key={i}>{JSON.stringify(item)}</p>;
      })}
    </div>
  );
}
