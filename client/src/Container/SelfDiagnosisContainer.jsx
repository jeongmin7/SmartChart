import React from "react";
import SelfDiagnosisComponent from "../components/SelfDiagnosisComponent";
import Button from "../components/Button";
import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { answerAtom } from "../stores/answerAtom";
import axios from "axios";
import { toast } from "react-toastify";

const SelfDiagnosisContainer = () => {
  const answers = useRecoilValue(answerAtom);

  const handleSubmit = async () => {
    try {
      await axios.post("/patient/health-check", answers, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success("성공적으로 저장되었습니다.");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Container>
      <SelfDiagnosisComponent />
      <Button
        width="100px"
        height="30px"
        padding="0"
        fontSize="15px"
        onClick={handleSubmit}
      >
        SAVE
      </Button>
    </Container>
  );
};

export default SelfDiagnosisContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;
