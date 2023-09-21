import React from "react";
import SelfDiagnosisComponent from "../components/SelfDiagnosisComponent";
import Button from "../components/Button";
import { styled } from "styled-components";

const SelfDiagnosisContainer = () => {
  return (
    <Container>
      <SelfDiagnosisComponent />
      <Button width="100px" height="30px" padding="0" fontSize="15px">
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
