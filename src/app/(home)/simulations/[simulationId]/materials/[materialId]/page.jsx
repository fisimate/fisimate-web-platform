import { useGetToken } from "@/hooks/useToken";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function EditMaterial({ params }) {
  const { simulationId, materialId } = params;

  const { push } = useRouter();
  const toast = useToast();

  const token = useGetToken();

  

  return <div>page</div>;
}
