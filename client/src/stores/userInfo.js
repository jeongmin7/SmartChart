import { atom } from "recoil";

export const userInfoAtom = atom({
  key: "userInfo",
  default: {
    username: "",
    gender: "",
    age: "",
    phoneNumber: "",
  },
});

export const hospitalAtom = atom({
  key: "hospitalInfo",
  default: {
    name: "",
    address: "",
    mapx: "",
    mapy: "",
    tel: "",
    category: "",
  },
});

export const userRoleAtom = atom({
  key: "userRole",
  default: {
    role: "PATIENT",
  },
});

export const chatUsername = atom({
  key: "chatUsername",
  default: {
    username: "",
  },
});
