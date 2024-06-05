import axiosInstance from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetBanks = ({ token, model }) => {
  return useQuery({
    queryKey: [`${model}-banks`],
    queryFn: async () => {
      return await axiosInstance.get(`/${model}-banks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};
