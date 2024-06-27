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
