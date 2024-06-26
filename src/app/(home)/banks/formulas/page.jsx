"use client";
import { useGetBanks } from "@/hooks/useBank";
import { Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";

export default function FormulaBank() {
  const tokenCookie = Cookies.get("token");
  const token = tokenCookie ? JSON.parse(tokenCookie)?.access_token : null;

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
