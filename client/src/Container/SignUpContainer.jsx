import React, { useState } from "react";
import SignUpComponent from "../components/SignUpComponent";

import { useRecoilState } from "recoil";
import { hospitalAtom } from "../stores/userInfo";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpContainer = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [passwordError, setPasswordError] = useState("");
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);

  const [isDoctor, setIsDoctor] = useState(false);
  const [hospitalInfo, setHospitalInfo] = useRecoilState(hospitalAtom);

  const emailCheck = async () => {
    setIsEmailDuplicate(true);

    if (isDoctor) {
      await axios
        .post(
          "/doctor/check-email",
          { email: userInfo.email },
          {
            withCredential: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.code === 200) {
            // 중복되지 않을 때
            setIsEmailDuplicate(true);
            toast.success(response.data.message);
          } else {
            // 중복될 때
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          // 오류 처리
          setIsEmailDuplicate(false);
          console.error(error);
        });
    } else {
      await axios
        .post(
          "/patient/check-email",
          { email: userInfo.email },
          {
            withCredential: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.code === 200) {
            // 중복되지 않을 때
            setIsEmailDuplicate(true);
            toast.success(response.data.message);
          } else {
            // 중복될 때
            setIsEmailDuplicate(false);

            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          // 오류 처리
          setIsEmailDuplicate(false);
          toast.error("데이터를 읽어오는데 실패했습니다.");
        });
    }
  };
  const handleRadioChange = (e) => {
    setIsDoctor(!isDoctor);
  };

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
    if (name === "email") {
      const validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!value?.match(validRegex)) {
        setEmailError("이메일 형식이 올바르지 않습니다.");
      } else {
        setEmailError("");
      }
    }
    if (name === "password") {
      if (userInfo.passwordConfirm && value !== userInfo.passwordConfirm) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordError("");
      }
    }
    if (name === "passwordConfirm") {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        passwordConfirm: value,
      }));

      if (userInfo.password && value !== userInfo.password) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordError("");
      }
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    // 필수 정보 확인
    let requiredFields = [
      "email",
      "password",
      "name",
      "gender",
      "age",
      "phoneNumber",
    ];
    if (isDoctor) {
      requiredFields.push("hospitalInfo");
    }
    const missingFields = requiredFields.filter((field) => {
      if (field === "hospitalInfo") {
        return (
          isDoctor && (!hospitalInfo || Object.keys(hospitalInfo).length === 0)
        );
      } else {
        return !userInfo[field];
      }
    });

    if (missingFields.length > 0) {
      toast.warn("모든 항목을 입력해주세요");
      return;
    }

    if (!isEmailDuplicate) {
      toast.warn("이메일 중복확인을 진행해주세요");
      return;
    }

    try {
      if (isDoctor === false) {
        axios
          .post(
            "/patient/join",
            {
              email: userInfo.email,
              password: userInfo.password,
              name: userInfo.name,
              gender: userInfo.gender,
              age: userInfo.age,
              phoneNumber: userInfo.phoneNumber,
            },
            {
              withCredential: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(function (response) {
            toast.success("회원가입에 성공했습니다.");
            navigate("/");
          })
          .catch(function (error) {
            console.error(error);
          });
      } else {
        axios
          .post(
            "/doctor/join",

            {
              email: userInfo.email,
              password: userInfo.password,
              name: userInfo.name,
              gender: userInfo.gender,
              age: userInfo.age,
              phoneNumber: userInfo.phoneNumber,
              hospitalName: hospitalInfo.name,
              mapx: parseInt(hospitalInfo.mapx),
              mapy: parseInt(hospitalInfo.mapy),
              category: hospitalInfo.category,
              hospitalPhoneNumber: hospitalInfo.tel,
              hospitalAddress: hospitalInfo.address,
            },
            {
              withCredential: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(function (response) {
            toast.success("회원가입에 성공했습니다.");
            setHospitalInfo([]);
            navigate("/");
          })
          .catch(function (error) {
            toast.error("회원가입에 실패하였습니다.");
          });
      }
    } catch (e) {}
  };
  return (
    <SignUpComponent
      emailError={emailError}
      userInfo={userInfo}
      passwordError={passwordError}
      isEmailDuplicate={isEmailDuplicate}
      isDoctor={isDoctor}
      emailCheck={emailCheck}
      handleRadioChange={handleRadioChange}
      onChange={onChange}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default SignUpContainer;
