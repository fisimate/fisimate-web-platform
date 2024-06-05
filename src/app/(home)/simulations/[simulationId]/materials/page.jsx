"use client";

import { useGetMaterials } from "@/hooks/useMaterial";
import { Spinner, useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Material({ params }) {
  const simulationId = params.simulationId;

  const toast = useToast();
  const route = useRouter();

  const token = JSON.parse(Cookies.get("token")).access_token;

  const { data, isLoading, isError } = useGetMaterials({
    simulationId,
    token,
  });

  if (isError) {
    toast({
      title: "Data not found!",
      status: "error",
      isClosable: true,
    });

    route.push("/simulations");
  }

  return (
    <div className="">
      {isLoading && <Spinner />}
      {JSON.stringify(data?.data)}
    </div>
  );
}
