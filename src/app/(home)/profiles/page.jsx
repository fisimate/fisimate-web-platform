"use client";
import { useProfileQuery } from "@/hooks/useProfile";
import { Spinner, useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";

export default function Profile() {
  const token = JSON.parse(Cookies.get("token")).access_token;

  const toast = useToast();

  const { data, isError, isLoading } = useProfileQuery(token);

  if (isError) {
    toast({
      title: "Invalid user!",
      status: "error",
      isClosable: true,
      position: "top-right",
    });
  }

  return (
    <div className="">
      {JSON.stringify(data?.data?.data)}
      {isLoading && <Spinner />}
    </div>
  );
}
