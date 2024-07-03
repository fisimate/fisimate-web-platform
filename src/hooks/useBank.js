import axiosInstance from "@/libs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetBanks = ({ token, model }) => {
  return useQuery({
    queryKey: [`${model}-banks`],
    queryFn: async () => {
      return await axiosInstance.get(`/${model}-banks/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};

export const useGetOneBank = ({ token, model, dataId }) => {
  return useQuery({
    queryKey: [`${dataId}-${model}-bank`],
    queryFn: async () => {
      return await axiosInstance.get(`/${model}-banks/${dataId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};

export const useCreateBank = ({ onSuccess, onError, token, model }) => {
  return useMutation({
    mutationFn: async ({ body }) => {
      return await axiosInstance.post(`/${model}-banks`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess,
    onError,
  });
};

export const useUpdateBank = ({ onSuccess, onError, token, model }) => {
  return useMutation({
    mutationFn: async ({ dataId, body }) => {
      return await axiosInstance.put(`/${model}-banks/${dataId}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess,
    onError,
  });
};

export const useDeleteBank = ({ onSuccess, onError, token, model }) => {
  return useMutation({
    mutationFn: async ({ dataId }) => {
      return await axiosInstance.delete(`/${model}-banks/${dataId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess,
    onError,
  });
};
