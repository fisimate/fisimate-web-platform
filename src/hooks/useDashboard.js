import axiosInstance from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboard = (token) => {
  return useQuery({
    queryFn: async () => {
      return await axiosInstance.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};