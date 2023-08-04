import React, { useState } from "react";
import Input from "./Input";
import { styled } from "styled-components";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(0);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <Wrapper>
      <h1>회원가입</h1>
      <h3>아래 정보를 입력해주세요.</h3>
      <span>계정정보</span>
      <ContentWrapper>
        이메일
        <Input
          email
          id="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </ContentWrapper>
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
          name
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
          age
          id="age"
          placeholder="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div>
        연락처
        <Input
          phoneNumber
          id="phoneNumber"
          placeholder="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
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
