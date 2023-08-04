import React from "react";
import SignUpForm from "../components/SignUpForm";
import Button from "../components/Button";

const DoctorSignUp = () => {
  return (
    <div>
      <div>
        <SignUpForm />
        <div>병원정보 검색하기</div>
        <Button type="submit" width="80%">
          회원가입
        </Button>
      </div>
    </div>
  );
};

export default DoctorSignUp;
