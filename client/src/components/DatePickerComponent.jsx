import React from "react";
import { styled } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from "recoil";
import { dateAtom } from "../stores/dateAtom";

const DatePickerComponent = () => {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useRecoilState(dateAtom);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Container>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        minDate={today}
        placeholderText="날짜를 선택하세요"
      />
    </Container>
  );
};

export default DatePickerComponent;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
