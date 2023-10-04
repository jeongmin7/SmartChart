import React from "react";
import SelectData from "../components/SelectData";
import DatePicker from "../components/DatePickerComponent";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";
import Button from "../components/Button";

const Appointment = () => {
  const data = {
    patientName: "watch",
    patiengGender: "여자",
    patientgAge: 12,
    patiengPhoneNumber: 1111111,
    hospitalName: "연세에스웰 피부과",
    doctorId: 5,
  };
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
        <FirstColumnHalfWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>환자이름:</InfoTitle>
              <InfoValue>{data.patientName}</InfoValue>
            </RowDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>성별:</InfoTitle>
              <InfoValue>{data.patiengGender}</InfoValue>
            </RowDivideWrapper>
          </ColumnDivideWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>나이:</InfoTitle>
              <InfoValue>{data.patientgAge}</InfoValue>
            </RowDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>전화번호:</InfoTitle>
              <InfoValue>{data.patiengPhoneNumber}</InfoValue>
            </RowDivideWrapper>
          </ColumnDivideWrapper>
        </FirstColumnHalfWrapper>
        <ColumnHalfWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>병원이름:</InfoTitle>
              <InfoValue>{data.hospitalName}</InfoValue>
            </RowDivideWrapper>

            <RowDivideWrapper>
              <InfoTitle>예약날짜:</InfoTitle>
              <DatePicker />
            </RowDivideWrapper>
          </ColumnDivideWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper style={{ paddingRight: "20px" }}>
              <SelectData availableOption={availableTimes} title="예약시간" />
            </RowDivideWrapper>
            <RowDivideWrapper>
              <Button width="100px" height="30px" padding="0" fontSize="12px">
                예약 가능 조회
              </Button>
            </RowDivideWrapper>
          </ColumnDivideWrapper>
        </ColumnHalfWrapper>
        <Button width="100px" height="100px" padding="0" fontSize="15px">
          SAVE
        </Button>
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
  min-width: 950px;
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
  min-width: 950px;
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

const ColumnHalfWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 80px 0%;
`;

const ColumnDivideWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 40%;
  /* background-color: purple; */
`;

const FirstColumnHalfWrapper = styled(ColumnHalfWrapper)`
  border-bottom: 1px solid ${palette.gray.border};
`;

const RowDivideWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 16px;
  /* background-color: purple; */
`;

const InfoTitle = styled.div`
  width: 30%;
`;

const InfoValue = styled.div`
  width: 70%;
`;
