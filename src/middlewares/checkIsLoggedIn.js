import axiosInstance from "@/libs/axios";

export default function checkIsLoggedIn(token) {
  try {
    const accessToken = JSON.parse(token.value).access_token;

    return axiosInstance
      .get("/users/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((data) => {
        // set state
        return true;
      })
      .catch((error) => {
        return false;
      });
  } catch (error) {
    return false;
  }
}
