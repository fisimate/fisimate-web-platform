import axiosInstance from "@/libs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetQuizzes = ({ simulationId, token }) => {
  return useQuery({
    queryFn: async () => {
      return await axiosInstance.get(`/simulations/${simulationId}/quizzes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    queryKey: ["quizzes"],
  });
};

export const useGetOneQuiz = ({ simulationId, token, dataId }) => {
  return useQuery({
    queryFn: async () => {
      return await axiosInstance.get(
        `/simulations/${simulationId}/quizzes/${dataId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    queryKey: [`quizzes-${dataId}`],
  });
};

export const useCreateQuiz = ({ onSuccess, onError, token, simulationId }) => {
  return useMutation({
    mutationFn: async ({ body }) => {
      return await axiosInstance.post(
        `/simulations/${simulationId}/quizzes`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onError,
    onSuccess,
  });
};

export const useUpdateQuiz = ({ onSuccess, onError, token, simulationId }) => {
  return useMutation({
    mutationFn: async ({ dataId, body }) => {
      return await axiosInstance.put(
        `/simulations/${simulationId}/quizzes/${dataId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onError,
    onSuccess,
  });
};

export const useDeleteQuiz = ({ onSuccess, onError, token, simulationId }) => {
  return useMutation({
    mutationFn: async ({ dataId }) => {
      return await axiosInstance.delete(
        `/simulations/${simulationId}/quizzes/${dataId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onError,
    onSuccess,
  });
};
