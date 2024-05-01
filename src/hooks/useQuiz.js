import axiosInstance from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useQuizQuery = ({ onSuccess, onError }) => {
  return useQuery({
    queryFn: async (simulationId) => {
      return await axiosInstance.get(`/simulations/${simulationId}/quizzes`);
    },
    queryKey: "quizzes",
    gcTime: 5000,
  });
};


