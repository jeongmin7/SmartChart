import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import SaveIdCheckbox from "./SaveIdCheckbox";
import Input from "./Input";
import Loader from "./Loader";
import Logo from "./Logo";
import { styled } from "styled-components";
import { path } from "../modules/define/path";
import Modal from "./Modal";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [findPassword, setFindPassword] = useState(false);
  const handlePassord = () => {
    setFindPassword(!findPassword);
  };
  const inputGroup = ["email", "password"];

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log("123");
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
          {/* TODO: not find page */}
          <div onClick={handlePassord}>아이디- 비밀번호 찾기</div>
          {console.log(findPassword)}
          {findPassword === true && (
            <Modal isOpen={findPassword} handleModal={handlePassord}>
              <PContainer>
                <PasswordTitle>
                  <div>비밀번호 찾기</div>
                </PasswordTitle>
                <span>입력한 이메일로 임시 비밀번호가 전송됩니다.</span>
                <PInput type="email" />
                <PButton>비밀번호 전송</PButton>
              </PContainer>
            </Modal>
          )}
          <span style={{ margin: "0 10px" }}>|</span>
          <LinkTag to={path.signUp}>회원가입</LinkTag>
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

const PContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #333;
`;
const PasswordTitle = styled.div`
  font-size: 20px;
  margin-bottom: 30px;
`;
const PInput = styled.input`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const PButton = styled.button`
  background-color: #1798e1;
  border: none;
  color: #fff;
  font-weight: 600;
  padding: 5px 10px;
`;
