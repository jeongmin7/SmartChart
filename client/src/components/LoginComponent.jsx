import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import SaveIdCheckbox from "./SaveIdCheckbox";
import Input from "./Input";
import Loader from "./Loader";
import Logo from "./Logo";
import { styled } from "styled-components";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputGroup = ["email", "password"];

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("123");
  };

  return (
    <LoginContainer>
      {isLoading && <Loader />}
      <LoginWrapper>
        <Logo />

        {inputGroup.map((inputEl, index) => (
          <Input
            key={index}
            width="100%"
            autoComplete="off"
            id={inputEl}
            placeholder={inputEl}
            value={inputEl === "email" ? email : password}
            onChange={(e) =>
              inputEl === "email"
                ? setEmail(e.target.value)
                : setPassword(e.target.value)
            }
            style={index === 0 ? { marginTop: "30px" } : {}}
          />
        ))}
        <CheckBoxContainer>
          <SaveIdCheckbox
            checked={isAutoLogin}
            onChange={(e) => setIsAutoLogin(e.target.checked)}
          />
        </CheckBoxContainer>
        <Button onClick={loginUser} width="100%" marginBottom="20px">
          로그인
        </Button>
        <LinkWrapper>
          <LinkTag to="/finduserinfo">아이디- 비밀번호 찾기</LinkTag>
          <span style={{ margin: "0 10px" }}>|</span>
          <LinkTag to="/signup">회원가입</LinkTag>
        </LinkWrapper>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default LoginComponent;

const LoginContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: yellow; */
  width: 100vw;
  height: 100vh;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 20%;
  height: 40%;
  min-width: 550px;
  min-height: 550px;
  background-color: white;
  padding: 30px;
  /* & > input {
    transform: translateX(-30px);
  } */
`;

const CheckBoxContainer = styled.div`
  width: 100%;
  height: 100px;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LinkTag = styled(Link)`
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 부모 요소의 색상 상속 */
`;
