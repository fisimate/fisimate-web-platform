import axiosInstance from "@/libs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useProfileQuery = (token) => {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: async () => {
      return await axiosInstance.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};

export const useUpdateProfile = ({ onSuccess, onError, token }) => {
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.put("/users/update", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess,
    onError,
  });
};

export const useUpdatePassword = ({ onSuccess, onError, token }) => {
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post("/users/password/update", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess,
    onError,
  });
};
