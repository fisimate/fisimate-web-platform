import axiosInstance from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetSimulations = ({ token }) => {
  return useQuery({
    queryKey: ["simulations"],
    queryFn: async () => {
      return await axiosInstance.get("/simulations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};

export const useGetOneSimulation = ({ token, simulationId }) => {
  return useQuery({
    queryKey: [`simulation-${simulationId}`],
    queryFn: async () => {
      return await axiosInstance.get(`/simulations/${simulationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};

export const useUpdateSimulation = ({ onSuccess, onError, token }) => {
  return useMutation({
    mutationFn: async ({ dataId, body }) => {
      return await axiosInstance.put(`/simulations/${dataId}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess,
    onError,
  });
};
