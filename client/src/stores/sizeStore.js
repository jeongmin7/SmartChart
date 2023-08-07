import { atom } from "recoil";

export const sizeStore = atom({
  key: "windowSize",
  default: { width: window.innerWidth, height: window.innerHeight },
});
