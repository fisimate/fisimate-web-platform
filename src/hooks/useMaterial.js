import axiosInstance from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetMaterials = ({ simulationId, token }) => {
  return useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      return await axiosInstance.get(`/simulations/${simulationId}/materials`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    retry: false,
  });
};
