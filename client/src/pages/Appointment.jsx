import React from "react";
import SelectData from "../components/SelectData";
import DatePicker from "../components/DatePickerComponent";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";

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
    <AppointmentContainer>
      <AppointmentWrapper>
        <Header>병원 예약하기</Header>
        {/* <InfoWrapper> */}
        <ColumnDivideWrapper>
          <RowDivideWrapper>환자이름: </RowDivideWrapper>
          <RowDivideWrapper>성별:</RowDivideWrapper>
        </ColumnDivideWrapper>
        <ColumnDivideWrapper>
          <RowDivideWrapper>나이</RowDivideWrapper>
          <RowDivideWrapper>전화번호</RowDivideWrapper>
        </ColumnDivideWrapper>
        <ColumnDivideWrapper>
          <RowDivideWrapper>병원이름</RowDivideWrapper>
          {/* 환자이름부터 병원이름까지는 저장된 데이터 리코일로 불러와야함 */}

          <RowDivideWrapper>
            예약날짜1
            <DatePicker />
          </RowDivideWrapper>
        </ColumnDivideWrapper>
        <ColumnDivideWrapper>
          <RowDivideWrapper>
            <SelectData availableOption={availableTimes} title="예약시간" />
          </RowDivideWrapper>
        </ColumnDivideWrapper>
        {/* </InfoWrapper> */}
      </AppointmentWrapper>
    </AppointmentContainer>
  );
};

export default Appointment;

const AppointmentContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: yellow; */
  width: 100vw;
  height: calc(100vh - 100px);
  min-width: 900px;
  min-height: 800px;
`;

const AppointmentWrapper = styled.div`
  /* background-color: green; */
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 40%;
  height: 80%;
  min-width: 900px;
  min-height: 800px;
  padding: 100px 200px 100px;
  border: 1px solid ${palette.gray.border};
  border-radius: 20px;
  /* div + div {
    margin-top: 20px;
  } */
`;

const Header = styled.div`
  /* background-color: red; */
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 25px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: blue;
`;

const ColumnDivideWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  /* background-color: purple; */
`;

const RowDivideWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 14px;
  /* background-color: purple; */
`;

// const
