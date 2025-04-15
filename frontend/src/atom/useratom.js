import { atom } from "recoil";

const userState = atom({
  key: "useratom",
  default: {
    isLoading: true,
    isAuthenticated: false,
    user: null,
  },
});

export default userState;
