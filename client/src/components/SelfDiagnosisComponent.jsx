import React, { useState } from "react";

const SelfDiagnosisComponent = () => {
  const data = [
    { q: "1.맥박이 빨라지거나 심장박동을 심하게 느낀다." },
    { q: "2.땀이 많이 난다." },
    { q: "3.떨리고 전율감이 느껴진다." },
    { q: "4.숨이 가빠지거나 숨이 막히는 것 같은 느낌이 든다." },
    { q: "5.질식할 것 같다." },
  ];

  const [answers, setAnswers] = useState(data.map(() => null));
  const handleAnswer = (index, value) => {
    console.log(index, value);
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <table>
      <tbody>
        {data.map(({ q }, index) => (
          <tr key={q}>
            <td>{q}</td>
            <td>
              <label>
                <input
                  type="radio"
                  value="네"
                  checked={answers[index] === "네"}
                  onChange={() => handleAnswer(index, "네")}
                />
                네
              </label>{" "}
              <label>
                <input
                  type="radio"
                  value="아니요"
                  checked={answers[index] === "아니요"}
                  onChange={() => handleAnswer(index, "아니요")}
                />
                아니요
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SelfDiagnosisComponent;
