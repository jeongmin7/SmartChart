import { atom } from "recoil";
import { questions } from "../assets/questions";

export const answerAtom = atom({
  key: "answerAtom",
  default: questions.map(() => ({ questionId: null, answer: null })),
});
