import { atom } from "recoil";

export const userInfoAtom = atom({
  key: "userInfo",
  default: {
    isDoctor: false,
    email: "",
    password: "",
    username: "",
    gender: "",
    age: "",
    phoneNumber: "",
  },
});
