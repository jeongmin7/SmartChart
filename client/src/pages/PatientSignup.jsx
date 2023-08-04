import React from "react";
import SignUpForm from "../components/SignUpForm";
import { styled } from "styled-components";
import Button from "../components/Button";

const PatientSignUp = () => {
  return (
    <Wrapper>
      <div>
        <SignUpForm />
        <Button type="submit" width="80%">
          회원가입
        </Button>
      </div>
    </Wrapper>
  );
};

export default PatientSignUp;
const Wrapper = styled.div`
  height: 100vh;
`;
