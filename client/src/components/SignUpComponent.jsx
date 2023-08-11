import React, { useState } from "react";
import Input from "./Input";
import { styled } from "styled-components";
import Button from "./Button";
import { palette } from "../styles/GlobalStyles";
import SearchHospital from "./SearchHospital";

const SignUpForm = () => {
  const [userInfo, setUserInfo] = useState({
    isDoctor: false,
    email: "",
    password: "",
    username: "",
    gender: "",
    age: "",
    phoneNumber: "",
  });
  // 의사냐 환자냐

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // TODO:유효성검사, 비밀번호 중복 확인
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (
    //   !userInfo.email ||
    //   !userInfo.password ||
    //   !userInfo.username ||
    //   !userInfo.age ||
    //   !userInfo.phoneNumber
    // ) {
    //   alert("모든 값을 입력해주세요.");
    //   return;
    // }
  };
  return (
    <SignUpContainer>
      <SignUpWrapper>
        <span
          style={{
            fontWeight: "bold",
            marginBottom: "20px",
            fontSize: "25px",
          }}
        >
          회원가입
        </span>
        <span
          style={{ color: "gray", fontWeight: "bold", marginBottom: "60px" }}
        >
          아래 정보를 입력해 주세요.
        </span>
        {/* <span>계정정보</span> */}
        <SelectWrapper>
          <label>
            환자
            <input
              type="radio"
              value="patient"
              name="isDoctor"
              checked={!userInfo.isDoctor}
              onChange={handleInputChange}
            />
          </label>
          <label>
            의사
            <input
              type="radio"
              value="doctor"
              name="isDoctor"
              checked={userInfo.isDoctor}
              onChange={handleInputChange}
            />
          </label>
        </SelectWrapper>
        <ContentWrapper>
          Email
          <Input
            email
            id="email"
            name="email"
            placeholder="email"
            width="100%"
            value={userInfo.email}
            marginbottom="0"
            onChange={handleInputChange}
          />
          <ButtonWrapper>
            <Button width="80px" height="20px" padding="0" fontSize="12px">
              중복확인
            </Button>
          </ButtonWrapper>
        </ContentWrapper>
        <ContentWrapper>
          Password
          <Input
            password
            id="password"
            name="password"
            placeholder="password"
            value={userInfo.password}
            marginbottom="0"
            onChange={handleInputChange}
          />
        </ContentWrapper>
        <ContentWrapper>
          Name
          <Input
            name="username"
            id="username"
            placeholder="username"
            value={userInfo.username}
            marginbottom="0"
            onChange={handleInputChange}
          />
        </ContentWrapper>
        <ContentWrapper>
          Age
          <Input
            name="age"
            id="age"
            placeholder="age"
            value={userInfo.age}
            marginBottom="0"
            onChange={handleInputChange}
          />
        </ContentWrapper>
        <ContentWrapper>
          Phone Number
          <Input
            name="phoneNumber"
            id="phoneNumber"
            placeholder="phoneNumber"
            value={userInfo.phoneNumber}
            marginbottom="0"
            onChange={handleInputChange}
          />
        </ContentWrapper>
        <GenderWrapper>
          Gender
          <select
            name="gender"
            value={userInfo.gender}
            onChange={handleInputChange}
            style={{
              marginLeft: "10px",
              border: `1px solid ${palette.gray.border}`,
              borderRadius: "4px",
            }}
          >
            <option value="">성별</option>
            <option value="여성">여성</option>
            <option value="남성">남성</option>
          </select>
        </GenderWrapper>
        {userInfo.isDoctor && <SearchHospital />}

        <Button onClick={handleSubmit} width="40%" height="40px">
          회원가입
        </Button>
      </SignUpWrapper>
    </SignUpContainer>
  );
};

export default SignUpForm;

const SignUpContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: yellow; */
  width: 100vw;
  height: 100vh;
`;

const SignUpWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 55%;
  min-width: 550px;
  min-height: 550px;
  background-color: white;
  padding: 30px;
  div + div {
    margin-top: 20px;
  }
  /* & > input {
    transform: translateX(-30px);
  } */
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-rows: 10px 1fr; /* 2개의 열을 가진 그리드를 만듦 */
  gap: 10px;
  width: 100%;
  font-weight: bold;
  font-size: 14px;
`;
const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: -70px;
  top: 220px;
`;

const GenderWrapper = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  /* justify-content: start; */
`;
