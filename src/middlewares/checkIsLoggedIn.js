import axiosInstance from "@/libs/axios";

export default function checkIsLoggedIn(token) {
  if (!token || token == undefined) {
    return false;
  }

  try {
    const accessToken = JSON.parse(token).access_token;

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
