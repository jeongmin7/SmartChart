import { atom } from "recoil";

export const userInfoAtom = atom({
  key: "userInfo",
  default: {
    isDoctor: true,
    email: "qwerty@naver.com  ",
    password: "qwerty",
    username: "이정민",
    gender: "male",
    age: "12",
    phoneNumber: "000-0000-0000",
  },
});
