import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SaveIdCheckbox from "./SaveIdCheckbox";
import Loader from "./Loader";
import Logo from "./Logo";
import Modal from "./Modal";
import Input from "./Input";
import { toast } from "react-toastify";
import {
  CheckBoxContainer,
  Error,
  Form,
  HelpContainer,
  Label,
  LabelWrapper,
  LogoContainer,
  PButton,
  PContainer,
  PContent,
  PInput,
  Password,
  PasswordTitle,
  Section,
  SelectWrapper,
  SignupLink,
} from "../styles/CommonStyle";
import { userRoleAtom } from "../stores/userInfo";
import { useRecoilState } from "recoil";
import kakao from "../assets/kakao_login_medium_wide.png";
import styled from "styled-components";
import axios from "axios";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const LoginComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(getCookie("email") || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [findPassword, setFindPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");
  const [userRole, setUserRole] = useRecoilState(userRoleAtom);

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
      const validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const handleRadioChange = (e) => {
    setIsDoctor(e.target.value === "doctor");
  };

  //FIXME:비밀번호 찾기
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const checkEmailValidity = (e) => {
    if (!emailRegex.test(e.target.value)) {
      setIsValidEmail(false);
      return;
    } else {
      setIsValidEmail(true);
    }
  };

  //FIXME:비밀번호 찾기
  const handlePassword = () => {
    setFindPassword(!findPassword);
  };
  // 쿠키 만료 날짜 설정 ( 7일 후로 설정)
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  const userLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isDoctor) {
      try {
        const response = await axios.post(
          "/doctor/login",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          toast.success("로그인 되었습니다.");
          setIsLoading(false);
          navigate("/hospitalpage");
          setUserRole({ role: response.data.role });
          localStorage.setItem("userRole", response.data.role);
          const session = response.data.session;

          document.cookie = `session=${session}; expires=${expirationDate.toUTCString()}; path=/`;
        }
      } catch (error) {
        if (error.response || error.response.status === 405) {
          toast.error("이메일, 비밀번호, 환자구별을 확인해주세요");
        }
      }

      if (isRememberMe) {
        // 이메일을 쿠키로 저장
        document.cookie = `email=${email}; expires=${expirationDate.toUTCString()}; path=/`;
      } else {
        document.cookie =
          "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    } else {
      try {
        const response = await axios.post(
          "/patient/login",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const token = response.data.token.token;

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);

        document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;

        if (isRememberMe) {
          document.cookie = `email=${email}; expires=${expirationDate.toUTCString()}; path=/`;
        } else {
          document.cookie =
            "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }

        if (response.status === 200) {
          toast.success("로그인 되었습니다.");
          setIsLoading(false);
          navigate("/mypage");
          setUserRole({ role: response.data.role });
          localStorage.setItem("userRole", response.data.role);
        }
      } catch (error) {
        if (error.response && error.response.status === 405) {
          toast.error("이메일, 비밀번호, 환자구별을 확인해주세요");
        }
        toast.error("데이터를 읽어오는데 실패했습니다.");
      }
    }
  };

  // FIXME:비밀번호 찾기
  const findPasswordButton = async (e) => {
    // TODO:실제 이메일만 갈 수 있으시 validation 체크 필요
    e.preventDefault();

    await axios
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
        }
      )
      .then((response) => {
        toast.success("이메일로 비밀번호 찾기 요청을 보냈습니다.");
      });
  };

  // "/"페이지 접근 막기
  useEffect(() => {
    const session = document.cookie.includes("session");
    const token = document.cookie.includes("token");

    if (session || token) {
      if (userRole.role === "DOCTOR") {
        navigate("/hospitalPage");
      } else if (userRole.role === "PATIENT") {
        navigate("/mypage");
      }
    }
  }, [navigate, userRole]);

  return (
    <>
      {isLoading && <Loader />}
      <Form onSubmit={userLogin}>
        <LogoContainer>
          <Logo />
        </LogoContainer>

        <Section>
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
        </Section>
        <Section>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="text"
            name="email"
            id="email"
            required
            value={email}
            onChange={onChange}
          />
        </Section>
        <Section>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={onChange}
          />
        </Section>
        {error && error?.length > 0 && (
          <Section>
            <Error>{error}</Error>
          </Section>
        )}
        <HelpContainer>
          <Password onClick={handlePassword}>비밀번호 찾기</Password>
          <SignupLink to="/signup">회원가입하기</SignupLink>
        </HelpContainer>
        {findPassword === true && (
          <Modal isOpen={findPassword} handleModal={handlePassword}>
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
        <Section>
          <CheckBoxContainer>
            <SaveIdCheckbox
              checked={isRememberMe}
              onChange={() => setIsRememberMe(!isRememberMe)}
            />
          </CheckBoxContainer>
        </Section>
        <LoginWrapper>
          <LoginButton
            type="submit"
            value="로그인"
            disabled={error?.length > 0}
          />
          {!isDoctor && (
            <Kakao href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=338b152f34fe502634c3e709272cd726&redirect_uri=http://localhost:3000/auth/kakao/callback">
              <img src={kakao} alt="카카오 로그인" />
            </Kakao>
          )}
        </LoginWrapper>
      </Form>
    </>
  );
};

export default LoginComponent;

const Kakao = styled.a`
  cursor: pointer;
`;
const LoginButton = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 48px;
  padding: 10px 10px;
  border-radius: 0.3rem;
  border: 1px solid lightgray;
  /* max-width: 300px; */
  /* float: right; */
  margin: 0 auto;
  cursor: pointer;
  font-size: 16px;
  background-color: #1798e1;
  color: white;
  font-weight: 600;
`;
const LoginWrapper = styled.div`
  /* min-width: 640px; */
  max-width: 680px;
  display: flex;
  flex-direction: row;
  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
`;
