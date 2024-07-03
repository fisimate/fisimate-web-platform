import axiosInstance from "@/libs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetChapters = ({ token }) => {
  return useQuery({
    queryKey: ["chapters"],
    queryFn: async () => {
      return await axiosInstance.get("/chapters", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};

export const useGetOneChapter = ({ token, chapterId }) => {
  return useQuery({
    queryKey: [`chapter-${chapterId}`],
    queryFn: async () => {
      return await axiosInstance.get(`/chapters/${chapterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};

export const useCreateChapter = ({ onSuccess, onError, token }) => {
  return useMutation({
    mutationFn: async ({ body }) => {
      return await axiosInstance.post("/chapters", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess,
    onError,
  });
};

export const useUpdateChapter = ({ onSuccess, onError, token, chapterId }) => {
  return useMutation({
    mutationFn: async ({ body }) => {
      return await axiosInstance.put(`/chapters/${chapterId}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess,
    onError,
  });
};

export const useDeleteChapter = ({ onSuccess, onError, token, chapterId }) => {
  return useMutation({
    mutationFn: async () => {
      return await axiosInstance.delete(`/chapters/${chapterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess,
    onError,
  });
};
