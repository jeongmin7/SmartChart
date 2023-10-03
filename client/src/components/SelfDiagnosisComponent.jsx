import React, { useState } from "react";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";

const SelfDiagnosisComponent = () => {
  const questions = [
    {
      question:
        "뇌졸증, 심근경색, 고혈압, 당뇨병, 이상지질혈증, 폐결핵, 암과 같은 질병으로 진단을 받았거나, 현재 약물 치료 중이십니까?",
      questionId: 1,
    },
    {
      question:
        "부모, 형제, 자매 중에 1번 문항의 질환을 앓았거나 해당 질환으로 사망한 경우가 있으십니까?",
      questionId: 2,
    },
    {
      question: "B형간염 바이러스 보유자입니까?",
      questionId: 3,
    },
    {
      question:
        "지금까지 평생 총 5갑(100개비) 이상의 담배를 피운 적이 있습니까?",
      questionId: 4,
    },
    {
      question: "현재도 흡연을 하고 계십니까?",
      questionId: 5,
    },
    {
      question: "전자담배를 사용한 경험이 있습니까?",
      questionId: 6,
    },
    {
      question: "최근 술을 마시는 횟수는 한달에 30회 이상입니까?",
      questionId: 7,
    },
    {
      question:
        "평소 1주일간, 숨이 많이 차게 만드는 고강도 신체활동을 3회 이상 하십니까?",
      questionId: 8,
    },
    {
      question:
        "평소 하루에 숨이 많이 차게 만드는 고강도 신체활동을 1시간 이상 하십니까?",
      questionId: 9,
    },
    {
      question:
        "평소 1주일간, 숨이 약간 차게 만드는 중강도 신체활동을 2일 이상 하십니까?",
      questionId: 10,
    },
    {
      question:
        "최근 1주일 동안 팔굽혀펴기, 윗몸일으키기, 아령, 역기, 철봉 등 근력 운동을 한 날은 3회이상입니까?",
      questionId: 11,
    },
    {
      question:
        "심장에 문제가 있어서 운동을 할 경우 의사의 권고에 의해서만 하라고 들은 적이 있습니까?",
      questionId: 12,
    },
    {
      question: "운동을 할 때 가슴에 통증을 느낀 적이 있습니까?",
      questionId: 13,
    },
    {
      question:
        "지난달에 운동을 하지 않고 있는 동안에도 가슴에 통증을 느낀 적이 있습니까?",
      questionId: 14,
    },
    {
      question: "운동을 바꾼 후에 뼈나 관절에 문제가 생긴 적이 있습니까?",
      questionId: 15,
    },
    {
      question: "현재 혈압이나 심장문제로 의사로부터 처방을 받고 있습니까?",
      questionId: 16,
    },
    {
      question:
        "우유나 칼슘강화두유, 기타 유제품(요구르트 등)을 매일 1컵(200ml) 이상 마십니까?",
      questionId: 17,
    },
    {
      question:
        "육류, 생선, 달걀, 콩, 두부 등으로 된 음식을 매일 3회 이상 먹습니까?",
      questionId: 18,
    },
    {
      question: "김치 이외의 채소를 식사할 때 마다 먹습니까?",
      questionId: 19,
    },
    {
      question: "매일 과일(1개)을 먹습니까?",
      questionId: 20,
    },
    {
      question: "튀김이나 볶음 요리를 주 4회 이상 먹습니까?",
      questionId: 21,
    },
  ];

  const [answers, setAnswers] = useState(questions.map(() => null));
  const [data, setData] = useState([]);

  const handleAnswer = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };
  return (
    <Table>
      <Subject>
        <Title>기본 건강 체크</Title>
        <Body>
          {data.length !== 0
            ? data.map(({ question, questionId, answer }) => (
                <div key={questionId}>
                  <SubTitle>
                    {questionId}. {question}
                  </SubTitle>

                  <div>
                    <Label>
                      <input
                        type="radio"
                        value="예"
                        defaultChecked={answer === "예"}
                        style={{ marginRight: "30px" }}
                      />
                      네
                    </Label>
                    <Label>
                      <input
                        type="radio"
                        value="아니오"
                        defaultChecked={answer === "아니오"}
                        style={{ marginRight: "30px" }}
                      />
                      아니요
                    </Label>
                    <Label>
                      <input
                        type="radio"
                        value="모름"
                        defaultChecked={answer === "모름"}
                        style={{ marginRight: "30px" }}
                      />
                      모름
                    </Label>
                  </div>
                </div>
              ))
            : questions.map(({ question, questionId }) => (
                <div key={questionId}>
                  <SubTitle>
                    {questionId}. {question}
                  </SubTitle>
                  <div>
                    <Label>
                      <input
                        type="radio"
                        value="네"
                        checked={answers[questionId - 1] === "Y"}
                        onChange={() => handleAnswer(questionId - 1, "Y")}
                        style={{ marginRight: "30px" }}
                      />
                      네
                    </Label>
                    <Label>
                      <input
                        type="radio"
                        value="아니오"
                        checked={answers[questionId - 1] === "N"}
                        onChange={() => handleAnswer(questionId - 1, "N")}
                        style={{ marginRight: "30px" }}
                      />
                      아니요
                    </Label>
                    <Label>
                      <input
                        type="radio"
                        value="모름"
                        checked={answers[questionId - 1] === "unawareness"}
                        onChange={() =>
                          handleAnswer(questionId - 1, "unawareness")
                        }
                        style={{ marginRight: "30px" }}
                      />
                      모름
                    </Label>
                  </div>
                </div>
              ))}
        </Body>
      </Subject>
    </Table>
  );
};

export default SelfDiagnosisComponent;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Subject = styled.div`
  height: 70%;
  min-width: 450px;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  outline: 1px solid ${palette.gray.border};
  margin-bottom: 30px;
  margin-top: 30px;
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
  padding: 1rem;
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
