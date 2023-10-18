import React from "react";
import SelfDiagnosisComponent from "../components/SelfDiagnosisComponent";
import Button from "../components/Button";
import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { answerAtom } from "../stores/answerAtom";
import instance from "../components/api";

const SelfDiagnosisContainer = () => {
  const answers = useRecoilValue(answerAtom);

  const handleSubmit = () => {
    instance
      .post(
        "/patient/health-check",
        { answers },
        {
          withCredential: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((response) => console.log(response));
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
