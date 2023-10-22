import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { palette } from "../styles/GlobalStyles";
import SearchHospital from "./SearchHospital";
import instance from "./api";
import {
  Error,
  Form,
  Label,
  LabelWrapper,
  Section,
  SelectWrapper,
  SubmitButton,
} from "../styles/CommonStyle";
import { useRecoilValue } from "recoil";
import { hospitalAtom } from "../stores/userInfo";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const [emailError, setEmailError] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [passwordError, setPasswordError] = useState("");
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);

  const [isDoctor, setIsDoctor] = useState(false);
  const hospitalInfo = useRecoilValue(hospitalAtom);
  const fullAddress = `${hospitalInfo.address} ${hospitalInfo.detailAddress}`;

  const emailCheck = async () => {
    if (isDoctor) {
      await instance
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
            setIsEmailDuplicate(false);
            toast.success(response.data.message);
          } else {
            setIsEmailDuplicate(true);
            toast.error(response.data.message);
          }
        });
    } else {
      await instance
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
            setIsEmailDuplicate(false);
            toast.success(response.data.message);
          } else {
            setIsEmailDuplicate(true);
            toast.error(response.data.message);
          }
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
    e.preventDefault();
    if (isEmailDuplicate === false) {
      // 중복 확인을 하지 않았을 때
      toast.warn("이메일 중복확인을 진행해주세요");
      return;
    }

    try {
      if (isDoctor === false) {
        // 필수 필드가 비어 있는 경우
        instance
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
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        instance
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
              hospitalAddress: fullAddress,
              mapx: parseInt(hospitalInfo.mapx),
              mapy: parseInt(hospitalInfo.mapy),
              category: hospitalInfo.specialty,
              hospitalPhoneNumber: hospitalInfo.tel,
            },
            {
              withCredential: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } catch (e) {}
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <div>아래 정보를 입력해주세요.</div>
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
                name="isDoctor"
                checked={isDoctor}
                onChange={handleRadioChange}
              />
            </LabelWrapper>
          </SelectWrapper>
        </Section>
        <Section email>
          <div style={{ flex: 1 }}>
            <Label htmlFor="email">이메일</Label>
            <Input
              type="text"
              name="email"
              id="email"
              required
              value={userInfo.email}
              onChange={onChange}
              marginB="5px"
              width="98%"
            />
          </div>
          <Button
            width="10%"
            height="30px"
            padding="0"
            fontSize="12px"
            borderRadius="5px"
            marginB="20px"
            fontweight="700"
            onClick={emailCheck}
            disabled={userInfo.email && emailError?.length > 0}
          >
            중복확인
          </Button>
        </Section>

        {emailError && emailError?.length > 0 && <Error>{emailError}</Error>}
        <Section>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            name="password"
            id="password"
            required
            value={userInfo.password}
            onChange={onChange}
            marginB="5px"
          />
        </Section>
        <Section>
          <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
          <Input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            required
            value={userInfo.passwordConfirm}
            marginB="5px"
            onChange={onChange}
          />
          {passwordError && passwordError?.length > 0 && (
            <Error>{passwordError}</Error>
          )}
        </Section>
        <Section>
          <Label htmlFor="name">이름</Label>
          <Input
            type="name"
            name="name"
            id="name"
            required
            marginB="5px"
            onChange={onChange}
          />
        </Section>

        <Section>
          <Label htmlFor="gender">성별</Label>

          <select
            name="gender"
            onChange={handleInputChange}
            required={isDoctor}
            style={{
              marginLeft: "10px",
              border: `1px solid ${palette.gray.border}`,
              borderRadius: "4px",
              width: "50%",
              height: "2.5rem",
            }}
          >
            <option value="">성별</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        </Section>
        <Section>
          <Label htmlFor="age">나이</Label>
          <Input
            type="text"
            name="age"
            id="age"
            required={isDoctor}
            onChange={onChange}
            marginB="5px"
          />
        </Section>
        <Section>
          <Label htmlFor="phoneNumber">전화번호</Label>
          <Input
            type="tel"
            name="phoneNumber"
            required={isDoctor}
            id="phoneNumber"
            onChange={onChange}
            marginB="5px"
          />
        </Section>
        {isDoctor === true && <SearchHospital />}
        <Section>
          <SubmitButton
            type="submit"
            value="회원가입"
            disabled={emailError?.length > 0}
          />
        </Section>
      </Form>
    </>
  );
};

export default SignUpForm;
