import React from "react";
import SignUpForm from "../components/SignUpForm";
import Button from "../components/Button";

const SignUp = () => {
  return (
    <>
      <SignUpForm />
      {/* <div>병원정보 검색하기</div> */}
      <Button type="submit" width="80%">
        회원가입
      </Button>
    </>
  );
};

export default SignUp;
