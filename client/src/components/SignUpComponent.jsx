import React, { useState } from "react";
import Input from "./Input";
import { styled } from "styled-components";
import Button from "./Button";
import SearchHospital from "./SearchHospital";
import { palette } from "../styles/GlobalStyles";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <SignUpContainer>
      <SignUpWrapper>
        <span
          style={{ fontWeight: "bold", marginBottom: "20px", fontSize: "25px" }}
        >
          회원가입
        </span>
        <span
          style={{ color: "gray", fontWeight: "bold", marginBottom: "60px" }}
        >
          아래 정보를 입력해 주세요.
        </span>
        {/* <span>계정정보</span> */}
        <ContentWrapper>
          Email
          <Input
            email
            id="email"
            name="email"
            placeholder="email"
            width="100%"
            value={email}
            marginBottom="0"
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            marginBottom="0"
            onChange={(e) => setPassword(e.target.value)}
          />
        </ContentWrapper>
        <ContentWrapper>
          Name
          <Input
            name="username"
            id="username"
            placeholder="username"
            value={username}
            marginBottom="0"
            onChange={(e) => setUsername(e.target.value)}
          />
        </ContentWrapper>
        <ContentWrapper>
          Age
          <Input
            name="age"
            id="age"
            placeholder="age"
            value={age}
            marginBottom="0"
            onChange={(e) => setAge(e.target.value)}
          />
        </ContentWrapper>
        <ContentWrapper>
          Phone Number
          <Input
            name="phoneNumber"
            id="phoneNumber"
            placeholder="phoneNumber"
            value={phoneNumber}
            marginBottom="0"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </ContentWrapper>
        <GenderWrapper>
          Gender
          <select
            value={gender}
            onChange={handleGenderChange}
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
        {selectedOption === "doctor" && <SearchHospital />}

        <Button type="submit" width="40%" height="40px">
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

const ButtonWrapper = styled.div`
  position: absolute;
  right: -70px;
  top: 180px;
`;

const GenderWrapper = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  /* justify-content: start; */
`;
