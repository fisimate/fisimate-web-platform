import Cookies from "js-cookie";

export const useGetToken = () => {
  const token = Cookies.get("token");
  const cleanedToken = token ? JSON.parse(token)?.access_token : null;

  return cleanedToken;
};

export const useRemoveToken = () => {
  Cookies.remove("token");

  return;
};
