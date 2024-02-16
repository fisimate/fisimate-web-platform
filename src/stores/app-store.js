import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLoggedIn: null,
  user: null,
  setUser: (data) => {
    set(() => ({
      user: {
        id: data.user.id,
        fullname: data.user.fullname,
        email: data.user.email,
        token: data.access_token,
        refreshToken: data.refresh_token,
      },
    }));
  },
  removeUser: () => {
    set(() => ({
      user: null,
    }));
  },
}));
