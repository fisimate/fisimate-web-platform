"use client";
import { useGetBanks } from "@/hooks/useBank";
import { Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";

export default function FormulaBank() {
  const token = JSON.parse(Cookies.get("token")).access_token;

  const { data, isLoading } = useGetBanks({
    token,
    model: "formula",
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
