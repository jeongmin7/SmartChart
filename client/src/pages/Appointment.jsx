import React from "react";
import SelectData from "../components/SelectData";
import DatePicker from "../components/DatePickerComponent";

const Appointment = () => {
  const availableTimes = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
  ];

  return (
    <div>
      <h1>병원 예약하기</h1>
      <div>환자이름: </div>
      <div>성별:</div>
      <div>나이</div>
      <div>전화번호</div>
      <div>병원이름</div>
      {/* 환자이름부터 병원이름까지는 저장된 데이터 리코일로 불러와야함 */}

      <div>
        예약날짜1
        <DatePicker />
      </div>
      <SelectData availableOption={availableTimes} title="예약시간" />
    </div>
  );
};

export default Appointment;
