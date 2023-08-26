import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { dateAtom } from "../stores/dateAtom";

const SelectData = ({ availableOption, title }) => {
  const selectedDate = useRecoilValue(dateAtom);
  const [selectedOption, setSelectedOption] = useState("");

  console.log(selectedDate);

  const handleTimeChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Container>
      <InfoTitle>{title}</InfoTitle>
      <OptionSelect
        value={selectedOption}
        onChange={handleTimeChange}
        disabled={!selectedDate}
      >
        <option value="">{`${title} 선택`}</option>
        {availableOption.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </OptionSelect>
    </Container>
  );
};

export default SelectData;
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  /* flex-direction: column; */
`;

const OptionSelect = styled.select`
  width: 70%;
  padding: 10px;
  margin: 10px 0;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
`;

const InfoTitle = styled.div`
  width: 30%;
`;

const InfoValue = styled.div`
  width: 70%;
`;
