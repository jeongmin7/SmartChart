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

  const [isValidEmail, setIsValidEmail] = useState(true);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const checkPasswordValidity = (e) => {
    if (!emailRegex.test(e.target.value)) {
      setIsValidEmail(false);
      return;
    } else {
      setIsValidEmail(true);
    }
  };

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
          {findPassword === true && (
            <Modal isOpen={findPassword} handleModal={handlePassord}>
              <PContainer>
                <PasswordTitle>
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    비밀번호 찾기
                  </div>
                </PasswordTitle>
                <PContent>
                  <span style={{ color: "#555" }}>
                    입력한 이메일로 임시 비밀번호가 전송됩니다.
                  </span>
                  <PInput
                    type="email"
                    placeholder="qwerty@email.com"
                    onChange={checkPasswordValidity}
                  />
                  <Error>
                    {!isValidEmail && "이메일 주소가 유효하지 않습니다."}
                  </Error>
                  <PButton>비밀번호 전송</PButton>
                </PContent>
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
  padding-top: 20px;
`;
const PasswordTitle = styled.div`
  font-size: 20px;
  padding: 10px;
  background-color: #1798e1;
  border-radius: 5px;
  color: #fff;
  font-weight: 600;
  width: 50%;
  position: absolute;
  top: 10px;
  text-align: center;
  z-index: 1;
`;
const PContent = styled.div`
  border: 1px solid #333;
  border-radius: 5px;
  padding: 20px;
  padding-top: 40px;
`;
const PInput = styled.input`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: 1.5;
  border-color: #1798e1;
  border-radius: 3px;
`;

const PButton = styled.button`
  background-color: #1798e1;
  border: none;
  color: #fff;
  font-weight: 600;
  padding: 5px 10px;
`;
const Error = styled.div`
  color: red;
  margin-bottom: 10px;
  font-size: 14px;
`;
