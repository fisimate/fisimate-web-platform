"use client";
import { useGetBanks } from "@/hooks/useBank";
import { Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";

export default function MaterialBank() {
  const token = JSON.parse(Cookies.get("token")).access_token;

  const { data, isLoading } = useGetBanks({
    token,
    model: "material",
  });

  return (
    <div className="">
      {isLoading && <Spinner />}
      {data?.data?.data?.result.map((item, i) => {
        return <p>{JSON.stringify(item)}</p>;
      })}
    </div>
  );
}
