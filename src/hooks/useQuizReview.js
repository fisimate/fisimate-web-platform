import axiosInstance from "@/libs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetQuizReview = ({ token, simulationId }) => {
  return useQuery({
    queryKey: ["quiz-reviews"],
    queryFn: async () => {
      return await axiosInstance.get(`/quizzes/${simulationId}/review`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};

export const useCreateQuizReview = ({
  token,
  simulationId,
  onSuccess,
  onError,
}) => {
  return useMutation({
    mutationFn: async ({ body }) => {
      return await axiosInstance.post(`/quizzes/${simulationId}/review`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onError,
    onSuccess,
  });
};

export const useUpdateQuizReview = ({
  token,
  simulationId,
  onSuccess,
  onError,
}) => {
  return useMutation({
    mutationFn: async ({ body }) => {
      return await axiosInstance.put(`/quizzes/${simulationId}/review`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onError,
    onSuccess,
  });
};

export const useDeleteQuizReview = ({
  token,
  simulationId,
  onSuccess,
  onError,
}) => {
  return useMutation({
    mutationFn: async ({ body }) => {
      return await axiosInstance.delete(
        `/quizzes/${simulationId}/review`,
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
