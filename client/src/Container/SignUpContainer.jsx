import React from "react";
import SignUpForm from "../components/SignUpComponent";
import Button from "../components/Button";

const SignUpContainer = () => {
  return (
    <div>
      <SignUpForm />
      {/* <div>병원정보 검색하기</div> */}
      <Button type="submit" width="80%">
        회원가입
      </Button>
    </div>
  );
};

export default SignUpContainer;
