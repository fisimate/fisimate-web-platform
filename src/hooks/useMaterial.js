import axiosInstance from "@/libs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetMaterials = ({ simulationId, token }) => {
  return useQuery({
    queryKey: [`materials-${simulationId}`],
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

export const useCreateMaterial = ({
  onSuccess,
  onError,
  token,
  simulationId,
}) => {
  return useMutation({
    mutationFn: async ({ body }) => {
      return await axiosInstance.post(
        `/simulations/${simulationId}/materials`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess,
    onError,
  });
};

export const useUpdateMaterial = ({
  onSuccess,
  onError,
  token,
  simulationId,
}) => {
  return useMutation({
    mutationFn: async ({ dataId, body }) => {
      return await axiosInstance.put(
        `/simulations/${simulationId}/materials/${dataId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess,
    onError,
  });
};

export const useDeleteMaterial = ({
  onSuccess,
  onError,
  token,
  simulationId,
}) => {
  return useMutation({
    mutationFn: async ({ dataId }) => {
      return await axiosInstance.delete(
        `/simulations/${simulationId}/materials/${dataId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess,
    onError,
  });
};
