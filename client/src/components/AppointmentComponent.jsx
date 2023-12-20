import React from "react";
import { styled } from "styled-components";
import Button from "./Button";
import DatePicker from "./DatePickerComponent";
import { palette } from "../styles/GlobalStyles";
import { Container, Header, Wrapper } from "../styles/CommonStyle";
import SelectData from "./SelectData";
import Loader from "../components/Loader";

const AppointmentComponent = ({
  info,
  isLoading,
  checkAvailablity,
  selectedTime,
  availableTimes,
  selectedDate,
  checkAvaliablity,
  handleSave,
  isAppointmentPossible,
}) => {
  return (
    <Container>
      <Wrapper>
        <Header>병원 예약하기</Header>
        {isLoading && <Loader />}
        <FirstColumnHalfWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>환자이름:</InfoTitle>
              <InfoValue>{info.patientName}</InfoValue>
            </RowDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>성별:</InfoTitle>
              <InfoValue>{info.patiengGender}</InfoValue>
            </RowDivideWrapper>
          </ColumnDivideWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>나이:</InfoTitle>
              <InfoValue>{info.patientgAge}세</InfoValue>
            </RowDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>전화번호:</InfoTitle>
              <InfoValue>{info.patiengPhoneNumber}</InfoValue>
            </RowDivideWrapper>
          </ColumnDivideWrapper>
        </FirstColumnHalfWrapper>
        <ColumnHalfWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>병원이름:</InfoTitle>
              <InfoValue>{info.hospitalName}</InfoValue>
            </RowDivideWrapper>

            <RowDivideWrapper>
              <InfoTitle>예약날짜:</InfoTitle>
              <DatePicker />
            </RowDivideWrapper>
          </ColumnDivideWrapper>
          <ColumnDivideWrapper>
            <SelectTimeContainer>
              <RowDivideWrapper style={{ paddingRight: "20px" }}>
                <SelectData availableOption={availableTimes} title="예약시간" />
              </RowDivideWrapper>
              <RowDivideWrapper>
                <Button
                  width="100px"
                  height="35px"
                  padding="0"
                  borderRadius="10px"
                  fontSize="12px"
                  onClick={checkAvaliablity}
                  disabled={!selectedTime}
                >
                  예약 가능 조회
                </Button>
              </RowDivideWrapper>
            </SelectTimeContainer>
          </ColumnDivideWrapper>
        </ColumnHalfWrapper>
        <Button
          width="100px"
          height="45px"
          padding="0"
          fontSize="15px"
          borderRadius="10px"
          disabled={!checkAvailablity || !isAppointmentPossible}
          onClick={handleSave}
        >
          예약하기
        </Button>
      </Wrapper>
    </Container>
  );
};

export default AppointmentComponent;

const ColumnHalfWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 80px 0%;
  font-size: 20px;
`;

const ColumnDivideWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 40%;
  padding: 10px;
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
  font-size: 20px;
`;

const InfoTitle = styled.div`
  width: 30%;
`;

const InfoValue = styled.div`
  width: 70%;
`;
const SelectTimeContainer = styled.div`
  display: flex;
  width: 80%;
`;
