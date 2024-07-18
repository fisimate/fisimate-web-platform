import axiosInstance from "@/libs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllStudents = ({ token }) => {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      return await axiosInstance.get("/users/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};

export const useGetOneStudent = ({ token, dataId }) => {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      return await axiosInstance.get(`/users/students/${dataId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};

export const useGetStudentHistories = ({ token, userId }) => {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      return await axiosInstance.get(`/quizzes/attempt/history/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};

export const useCreateStudent = ({ token, onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ body }) => {
      return await axiosInstance.post("/users/students", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess,
    onError,
  });
};

export const useUpdateStudent = ({ token, onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ body, studentId }) => {
      return await axiosInstance.put(`/users/students/${studentId}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess,
    onError,
  });
};

export const useDeleteStudent = ({ token, onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ studentId }) => {
      return await axiosInstance.delete(`/users/students/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess,
    onError,
  });
};

export const useResetPassword = ({ token, onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ body, studentId }) => {
      return await axiosInstance.post(
        `/users/students/${studentId}/reset`,
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
