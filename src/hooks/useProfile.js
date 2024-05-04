import axiosInstance from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

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
