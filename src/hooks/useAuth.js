import axiosInstance from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useLogin = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      return await axiosInstance.post("/auth/login", body);
    },
    onSuccess,
    onError,
  });
};

export const useRegister = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      return await axiosInstance.post("/auth/register", body);
    },
    onSuccess,
    onError,
  });
};
