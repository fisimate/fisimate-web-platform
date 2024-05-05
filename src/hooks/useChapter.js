import axiosInstance from "@/libs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useChapterQuery = (token) => {
  return useQuery({
    queryKey: "chapters",
    queryFn: async () => {
      return await axiosInstance.get("/chapters", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};

export const useChapterMutation = ({ onSuccess, onError, token }) => {
  return useMutation({
    mutationFn: async (body) => {
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
