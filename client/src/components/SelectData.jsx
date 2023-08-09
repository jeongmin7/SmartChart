import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { dateAtom } from "../stores/dateAtom";

const SelectData = ({ availableOption, title }) => {
  const selectedDate = useRecoilValue(dateAtom);
  const [selectedOption, setSelectedOption] = useState("");

  const handleTimeChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Container>
      <div>{title}</div>
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
  flex-direction: column;
`;

const OptionSelect = styled.select`
  padding: 10px;
  margin: 10px 0;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
`;
