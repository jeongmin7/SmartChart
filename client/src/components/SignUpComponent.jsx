import React from "react";
import Input from "./Input";
import Button from "./Button";
import { palette } from "../styles/GlobalStyles";
import SearchHospital from "./SearchHospital";
import {
  Error,
  Label,
  LabelWrapper,
  Section,
  SelectWrapper,
} from "../styles/CommonStyle";
import styled from "styled-components";

const SignUpComponent = ({
  emailError,
  userInfo,
  passwordError,
  isEmailDuplicate,
  isDoctor,
  emailCheck,
  handleRadioChange,
  onChange,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <div>
      <Wrapper>
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
        <Section email="true">
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
            width="80px"
            height="40px"
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
          <Button
            width="100px"
            disabled={emailError?.length > 0}
            onClick={handleSubmit}
          >
            회원가입
          </Button>
        </Section>
      </Wrapper>
    </div>
  );
};

export default SignUpComponent;

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  padding: 2rem;
`;
