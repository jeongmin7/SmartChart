import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import SaveIdCheckbox from "./SaveIdCheckbox";
import Input from "./Input";
import Loader from "./Loader";
import Logo from "./Logo";
import { styled } from "styled-components";
import { path } from "../modules/define/path";
import Modal from "./Modal";
import instance from "./api";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("savedEmail") || "");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [findPassword, setFindPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail") || "";
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  console.log("email", email);
  const handleRadioChange = (e) => {
    setIsDoctor(e.target.value === "doctor");
  };

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const checkEmailValidity = (e) => {
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

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isDoctor) {
      await instance
        .post(
          "/doctor/login",
          {
            email: email,
            password: password,
          },
          {
            withCredential: true,
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then((response) => {
          localStorage.setItem("token", response.data.token.token);
          if (isRememberMe) {
            localStorage.setItem("savedEmail", email);
          } else {
            localStorage.removeItem("savedEmail");
          }
        });
    } else {
      await instance
        .post(
          "/patient/login",
          {
            email: email,
            password: password,
          },
          {
            withCredential: true,
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then((response) => {
          localStorage.setItem("token", response.data.token.token);
          if (isRememberMe) {
            localStorage.setItem("savedEmail", email);
          } else {
            localStorage.removeItem("savedEmail");
          }
        })

        .then(setIsLoading(false))
        .then(() => navigate("/searchHospital"));
    }
  };
  const findPasswordButton = async (e) => {
    // TODO:실제이메일만 갈 수 있으시 validation 체크 필요
    e.preventDefault();

    await instance
      .post(
        "/patient/sendEmail",
        {
          email: emailAddress,
        },
        {
          withCredential: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then(function (response) {
        console.log(response);
      });
  };

  return (
    <LoginContainer>
      {isLoading && <Loader />}
      <LoginWrapper>
        <Logo />
        <SelectWrapper>
          <LabelWrapper>
            환자
            <input
              type="radio"
              value="patient"
              name="isDoctor"
              checked={!isDoctor}
              onChange={handleRadioChange}
            />
          </LabelWrapper>
          <LabelWrapper>
            의사
            <input
              type="radio"
              value="doctor"
              name="isDoctor"
              checked={isDoctor}
              onChange={handleRadioChange}
            />
          </LabelWrapper>
        </SelectWrapper>

        <Input
          width="100%"
          autoComplete="off"
          id="email"
          placeholder={"이메일을 입력해주세요"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onBlur={(e) => checkEmailValidity(e)}
          style={{ marginTop: "30px" }}
        />
        {!isValidEmail && <Error>이메일주소를 확인해주세요 </Error>}
        <Input
          key="password"
          width="100%"
          autoComplete="off"
          id="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <CheckBoxContainer>
          <SaveIdCheckbox
            checked={isRememberMe}
            onChange={() => setIsRememberMe(!isRememberMe)}
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
                    onChange={(e) => {
                      setEmailAddress(e.target.value);
                      checkEmailValidity(e);
                    }}
                  />
                  <Error>
                    {!isValidEmail && "이메일 주소가 유효하지 않습니다."}
                  </Error>
                  <PButton onClick={findPasswordButton}>비밀번호 전송</PButton>
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
  width: 100vw;
  height: 100vh;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 40%;
  min-width: 550px;
  min-height: 550px;
  background-color: white;
  padding: 30px;
`;

const CheckBoxContainer = styled.div`
  width: 100%;
  height: 50px;
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
const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  justify-content: center;
  margin: 10px 0;
`;
const LabelWrapper = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
