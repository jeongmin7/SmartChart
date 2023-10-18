import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SaveIdCheckbox from "./SaveIdCheckbox";
import Loader from "./Loader";
import Logo from "./Logo";
import Modal from "./Modal";
import instance from "./api";
import Input from "./Input";
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
  SubmitButton,
} from "../styles/CommonStyle";

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

  // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
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

  const userLogin = async (e) => {
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
        .then((response) => console.log(response))
        .then(setIsLoading(false))
        .then(() => navigate("/mypage"));
      // .then((response) => {
      //   const token = response.data.token.token;

      //   // 쿠키 만료 날짜 설정 ( 7일 후로 설정)
      //   const expirationDate = new Date();
      //   expirationDate.setDate(expirationDate.getDate() + 7);

      //   // 쿠키 설정
      //   document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;

      //   if (isRememberMe) {
      //     // 이메일을 쿠키로 저장
      //     document.cookie = `email=${email}; expires=${expirationDate.toUTCString()}; path=/`;
      //   } else {
      //     document.cookie =
      //       "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      //   }
      // });
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
        })
        .then(setIsLoading(false))
        .then(() => navigate("/mypage"));
    }
  };

  // Todo:
  // FIXME:비밀번호 찾기
  const findPasswordButton = async (e) => {
    // TODO:실제 이메일만 갈 수 있으시 validation 체크 필요
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
        <Section>
          <SubmitButton
            type="submit"
            value="로그인"
            disabled={error?.length > 0}
          />
        </Section>
      </Form>
    </>
  );
};

export default LoginComponent;

// const CheckBoxContainer = styled.div`
//   width: 100%;
//   height: 50px;
// `;

// const PContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   color: #333;
//   padding-top: 20px;
// `;
// const PasswordTitle = styled.div`
//   font-size: 20px;
//   padding: 10px;
//   background-color: #1798e1;
//   border-radius: 5px;
//   color: #fff;
//   font-weight: 600;
//   width: 50%;
//   position: absolute;
//   top: 10px;
//   text-align: center;
//   z-index: 1;
// `;
// const PContent = styled.div`
//   border: 1px solid #333;
//   border-radius: 5px;
//   padding: 20px;
//   padding-top: 40px;
// `;
// const PInput = styled.input`
//   width: 100%;
//   margin-top: 10px;
//   margin-bottom: 10px;
//   line-height: 1.5;
//   border-color: #1798e1;
//   border-radius: 3px;
// `;

// const PButton = styled.button`
//   background-color: #1798e1;
//   border: none;
//   color: #fff;
//   font-weight: 600;
//   padding: 5px 10px;
// `;
// const Error = styled.div`
//   color: red;
//   margin-bottom: 10px;
//   font-size: 14px;
// `;
// const SelectWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 40px;
//   justify-content: center;
//   margin: 10px 0;
// `;
// const LabelWrapper = styled.label`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
// `;
// const Form = styled.form`
//   margin: 0 auto;
//   max-width: 680px;
//   padding: 20px;
//   margin-top: 20px;
//   min-height: 70vh;
//   margin-top: 10vh;
// `;
// const LogoContainer = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// const Section = styled.div`
//   margin-top: 20px;
//   width: 100%;
// `;
// const SectionInput = styled.input`
//   margin-top: 20px;
//   height: 40px;
//   padding: 10px 10px;
//   font-size: 16px;
//   border-radius: 0.3rem;
//   border: 1px solid lightgray;
//   width: 100%;
//   max-width: 680px;
// `;

// const Label = styled.label`
//   display: block;
//   font-weight: 500;
//   margin-bottom: 10px;
//   margin-top: 20px;
// `;
// const SubmitButton = styled.input`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 48px;
//   padding: 10px 10px;
//   border-radius: 0.3rem;
//   border: 1px solid lightgray;
//   max-width: 680px;
//   float: right;
//   margin: 0 auto;
//   cursor: pointer;
//   font-size: 16px;
//   background-color: #1798e1;
//   color: white;
//   font-weight: 600;
// `;

// const HelpContainer = styled.div`
//   margin-top: 20px;
//   width: 50%;
//   display: flex;
//   justify-content: space-between;
// `;
// const SignupLink = styled(Link)`
//   text-decoration: none;
//   color: ${palette.gray.dark};
// `;
// const Password = styled.div`
//   color: ${palette.gray.dark};
// `;
