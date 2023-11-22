import React, { useEffect, useState } from "react";
import SelectData from "../components/SelectData";
import DatePicker from "../components/DatePickerComponent";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";
import Button from "../components/Button";
import instance from "../components/api";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { dateAtom, selectedOptionState } from "../stores/dateAtom";
import axios from "axios";
import { toast } from "react-toastify";

const availableTimes = [
  "09:00:00",
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
];
const Appointment = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [info, setInfo] = useState({});
  const [checkAvailablity, setCheckAvailablity] = useState(false);
  const selectedDate = useRecoilValue(dateAtom);
  const selectedTime = useRecoilValue(selectedOptionState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/patient/reservation-view/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          withCredentials: true,
        });
        setInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const checkAvaliablity = () => {
    const data = {
      reservationDate: selectedDate,
      reservationTime: selectedTime,
    };
    axios
      .post("/patient/check-reservation", data)
      .then((response) => {
        toast.success("예약 가능한 시간입니다.");
        setCheckAvailablity(true);
      })
      .catch((error) => {
        toast.error("예약불가능한 시간입니다.");
      });
  };
  const handleSave = () => {
    axios
      .post(`/patient/reservation`, {
        doctorId: info.doctorId,
        reservationDate: selectedDate,
        reservationTime: selectedTime,
      })
      .then(toast.success("예약되었습니다."), navigate("/selfdiagnosis"))

      .catch((error) => toast.error("예약이 되지 않았습니다."));
  };
  return (
    <AppointmentContainer>
      <AppointmentWrapper>
        <Header>병원 예약하기</Header>

        {/* <InfoWrapper> */}
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
              <InfoValue>{info.patientgAge}</InfoValue>
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
            <RowDivideWrapper style={{ paddingRight: "20px" }}>
              <SelectData availableOption={availableTimes} title="예약시간" />
            </RowDivideWrapper>
            <RowDivideWrapper>
              <Button
                width="100px"
                height="30px"
                padding="0"
                fontSize="12px"
                onClick={checkAvaliablity}
              >
                예약 가능 조회
              </Button>
            </RowDivideWrapper>
          </ColumnDivideWrapper>
        </ColumnHalfWrapper>
        <Button
          width="100px"
          height="100px"
          padding="0"
          fontSize="15px"
          disabled={!checkAvailablity}
          onClick={handleSave}
        >
          예약하기
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
