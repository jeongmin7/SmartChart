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

        {inputGroup.map((inputEl) => (
          <Input
            width="60%"
            autoComplete="off"
            id={inputEl}
            placeholder={inputEl}
            value={inputEl === "email" ? email : password}
            onChange={(e) =>
              inputEl === "email"
                ? setEmail(e.target.value)
                : setPassword(e.target.value)
            }
          />
        ))}
        <div>
          <SaveIdCheckbox
            checked={isAutoLogin}
            onChange={(e) => setIsAutoLogin(e.target.checked)}
          />
        </div>
        <div>
          <Button onClick={loginUser} width="80%">
            로그인
          </Button>
        </div>

        <Link to="/finduserinfo">아이디- 비밀번호 찾기</Link>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default LoginComponent;

const LoginContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: yellow;
  width: 100vw;
  height: 100vh;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  height: 70%;
  min-width: 650px;
  min-height: 750px;
  background-color: white;
`;

const inputContainer = styled.div`
  width: 100%;
  height: 100%;
`;
