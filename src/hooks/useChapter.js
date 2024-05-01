import axiosInstance from "@/libs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useChapterQuery = () => {
  return useQuery({
    queryKey: "chapters",
    queryFn: async () => {
      return await axiosInstance.get("/chapters");
    },
  });
};

export const useChapterMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      return await axiosInstance.post("/chapters", body);
    },
    onSuccess,
    onError,
  });
};
