import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userRoleAtom } from "../stores/userInfo";
import { useRecoilState } from "recoil";
import axios from "axios";
import LoginComponent from "../components/LoginComponent";

const LoginFormContainer = () => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
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
  const localStorageUserRole = localStorage.getItem("userRole");

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
          setIsLoading(false);
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
          setIsLoading(false);
        }
        toast.error("데이터를 읽어오는데 실패했습니다.");
        setIsLoading(false);
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
      if (localStorageUserRole === "DOCTOR") {
        navigate("/hospitalPage");
      } else if (localStorageUserRole === "PATIENT") {
        navigate("/mypage");
      }
    }
  }, [localStorageUserRole, navigate]);

  return (
    <LoginComponent
      email={email}
      password={password}
      error={error}
      isRememberMe={isRememberMe}
      setIsRememberMe={setIsRememberMe}
      setEmailAddress={setEmailAddress}
      isDoctor={isDoctor}
      isLoading={isLoading}
      findPassword={findPassword}
      isValidEmail={isValidEmail}
      emailAddress={emailAddress}
      onChange={onChange}
      handleRadioChange={handleRadioChange}
      checkEmailValidity={checkEmailValidity}
      handlePassword={handlePassword}
      userLogin={userLogin}
      findPasswordButton={findPasswordButton}
    />
  );
};

export default LoginFormContainer;
