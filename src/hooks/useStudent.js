import axiosInstance from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const getAllStudents = ({ token }) => {
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

export const getOneStudent = ({ token, dataId }) => {
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

export const getStudentHistory = ({ token, userId }) => {
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
