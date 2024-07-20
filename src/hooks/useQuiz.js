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

export const useGenerateQuestion = ({ simulationId, token }) => {
  return useQuery({
    queryKey: [`generate`],
    queryFn: async () => {
      return await axiosInstance.get(`/simulations/${simulationId}/generate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    gcTime: 0,
  });
};

export const useGetQuizHistories = ({ token, studentId }) => {
  return useQuery({
    queryKey: [`histories-${studentId}`],
    queryFn: async () => {
      return await axiosInstance.get(`/quizzes/attempt/history/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};
