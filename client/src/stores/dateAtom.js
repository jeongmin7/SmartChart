import { atom } from "recoil";

export const dateAtom = atom({
  key: "dateAtom",
  default: new Date(),
});

export const selectedOptionState = atom({
  key: "selectedOptionState",
  default: "",
});
