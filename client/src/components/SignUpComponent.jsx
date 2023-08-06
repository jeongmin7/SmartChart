import React, { useState } from "react";
import Input from "./Input";
import { styled } from "styled-components";
import Button from "./Button";
import SearchHospital from "./SearchHospital";

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
    <Wrapper>
      <h1>회원가입</h1>
      <h3>아래 정보를 입력해주세요.</h3>
      <span>계정정보</span>
      <ContentWrapper>
        <div>
          <label>
            <input
              type="radio"
              value="patient"
              checked={selectedOption === "patient"}
              onChange={handleOptionChange}
            />
            환자
          </label>
          <label>
            <input
              type="radio"
              value="doctor"
              checked={selectedOption === "doctor"}
              onChange={handleOptionChange}
            />
            의사
          </label>
        </div>
        이메일
        <Input
          email
          id="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button width="3%">중복확인</Button>
        <div>
          비밀번호
          <Input
            password
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          이름
          <Input
            name="username"
            id="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          성별
          <select value={gender} onChange={handleGenderChange}>
            <option value="">성별</option>
            <option value="여성">여성</option>
            <option value="남성">남성</option>
          </select>
        </div>
        <div>
          나이
          <Input
            name="age"
            id="age"
            placeholder="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          연락처
          <Input
            name="
          phoneNumber"
            id="phoneNumber"
            placeholder="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        {selectedOption === "doctor" && <SearchHospital />}
      </ContentWrapper>
    </Wrapper>
  );
};

export default SignUpForm;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const ContentWrapper = styled.div`
  display: grid;
`;
