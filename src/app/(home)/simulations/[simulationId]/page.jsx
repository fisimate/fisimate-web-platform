import { useGetMaterials } from "@/hooks/useMaterial";
import { useGetQuizzes } from "@/hooks/useQuiz";
import { useGetToken } from "@/hooks/useToken";
import Link from "next/link";
import React from "react";

export default function SimulationDetail({ params }) {
  const { simulationId } = params;
  const token = useGetToken();
  const routeParent = `/simulations/${simulationId}`;

  const { data: dataMaterials, isLoading: isLoadingMaterial } = useGetMaterials(
    { simulationId, token }
  );

  const materialFields = ["simulation.name", "filePath"];
  const materialHeaders = [
    {
      title: "Simulasi",
    },
    {
      title: "File",
    },
  ];

  const { data: dataQuiz, isLoading: isLoadingQuiz } = useGetQuizzes({
    simulationId,
    token,
  });

  const questionFields = ["question.text", ""];
  const questionHeaders = [];

  return (
    // m,make table material and quiz
    <React.Fragment>
      <Link href={`${routeParent}/materials`}>
        <p>Materials</p>
      </Link>
      <Link href={`${routeParent}/quizzes`}>
        <p>Quizzes</p>
      </Link>
    </React.Fragment>
  );
}
