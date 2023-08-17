import React, { useState } from "react";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";
import Button from "./Button";

const SelfDiagnosisComponent = () => {
  const data = [
    { q: "1.  쉽게 피로감을 느낀다." },
    { q: "2.  특별한 이유 없이 체중이 감소한다." },
    { q: "3.  목덜미가 뻐근하거나 가슴에 통증을 느낀다." },
    { q: "4.  계단만 올라가도 쉽게 숨이 찬다." },
    { q: "5.  갈증이 심하고 소변을 자주 본다." },
    { q: "6.  변비나 설사 등 배변 습관에 변화가 생겼다." },
    { q: "7.  성인병과 각종 암의 가족력이 있다." },
    { q: "8.  건강 검진을 받은 지 1년 이상 지났다." },
  ];

  const [answers, setAnswers] = useState(data.map(() => null));

  // const navbarHeight = document.querySelector(".navbar-container").offsetHeight;

  const handleAnswer = (index, value) => {
    console.log(index, value);
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <Table>
      <Subject>
        <Title>기본 건강 체크</Title>
        <Body>
          {data.map(({ q }, index) => (
            <>
              <SubTitle>{q}</SubTitle>
              <Label>
                <input
                  type="radio"
                  value="네"
                  checked={answers[index] === "Y"}
                  onChange={() => handleAnswer(index, "Y")}
                  style={{ marginRight: "30px" }}
                />
                네
              </Label>
              <Label>
                <input
                  type="radio"
                  value="아니요"
                  checked={answers[index] === "N"}
                  onChange={() => handleAnswer(index, "N")}
                  style={{ marginRight: "30px" }}
                />
                아니요
              </Label>
            </>
          ))}
        </Body>
      </Subject>
      <Button width="100px" height="30px" padding="0" fontSize="15px">
        SAVE
      </Button>
    </Table>
  );
};

export default SelfDiagnosisComponent;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
  width: 100vw;
`;

const Subject = styled.div`
  width: 25%;
  height: 70%;
  min-width: 450px;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  outline: 1px solid ${palette.gray.border};
  margin-bottom: 30px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  width: 100%;
  height: calc(100% / 9);
  background-color: ${palette.gray.light};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% / 9 * 8);
  & > div {
    margin-bottom: 1px;
  }
  & > label + label {
    margin-top: 1px;
  }
  /* background-color: yellow; */
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  font-weight: 600;
  padding-left: 10px;
  background-color: ${palette.blue.light};
  outline: 1px solid ${palette.gray.border};
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 30px;
  outline: 1px solid ${palette.gray.border};
  padding-left: 10px;
`;
