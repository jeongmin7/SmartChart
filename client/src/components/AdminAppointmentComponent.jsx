import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import SelfDiagnosisComponent from "./SelfDiagnosisComponent";
import SendSMS from "./SendSMS";
import instance from "./api";

const appointments = [
  {
    name: "watch",
    id: 32,
    paymentStatus: "미완료",
    reservationStatus: "미완료",
    reservationTime: "10:00:00",
    reservationDate: "2023-09-01",
    phoneNumber: 1111111,
    patientId: 6,
  },
  {
    name: "watch",
    id: 31,
    paymentStatus: "미완료",
    reservationStatus: "미완료",
    reservationTime: "09:00:00",
    reservationDate: "2023-09-01",
    phoneNumber: 1111111,
    patientId: 6,
  },
  {
    name: "watch",
    id: 30,
    paymentStatus: "미완료",
    reservationStatus: "미완료",
    reservationTime: "09:00:00",
    reservationDate: "2029-08-31",
    phoneNumber: 1111111,
    patientId: 6,
  },
  {
    name: "watch",
    id: 29,
    paymentStatus: "미완료",
    reservationStatus: "미완료",
    reservationTime: "09:00:00",
    reservationDate: "2023-08-31",
    phoneNumber: 1111111,
    patientId: 6,
  },
  {
    name: "watch",
    id: 28,
    paymentStatus: "미완료",
    reservationStatus: "미완료",
    reservationTime: "18:00:00",
    reservationDate: "2023-08-31",
    phoneNumber: 1111111,
    patientId: 6,
  },
  {
    name: "watch",
    id: 27,
    paymentStatus: "미완료",
    reservationStatus: "미완료",
    reservationTime: "17:00:00",
    reservationDate: "2023-08-31",
    phoneNumber: 1111111,
    patientId: 6,
  },
];
const AdminAppointmentComponent = () => {
  const navigate = useNavigate();

  const [searchUsername, setSearchUsername] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSMSModalOpen, setIsSMSModalOpen] = useState(false);
  const [appointmentModals, setAppointmentModals] = useState(
    appointments.map(() => false)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/doctor/reservation-view", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("doctor", response);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUsernameChange = (event) => {
    setSearchUsername(event.target.value);
    filterAppointments(event.target.value, searchDate);
  };

  const handleDateChange = (event) => {
    setSearchDate(event.target.value);
    filterAppointments(searchUsername, event.target.value);
  };

  const filterAppointments = (username, date) => {
    const filtered = appointments.filter((appointment) => {
      const nameMatch = appointment.name.includes(username);
      const dateMatch = appointment.reservationDate.includes(date);
      return nameMatch && dateMatch;
    });

    setFilteredAppointments(filtered);
  };

  const handleClickBillingButton = (appointment) => {
    // 이거 대신 axios로 데이터 받아와서 navigate로 넘겨주기
    navigate(`/billing?id=${appointment.id}`, {
      state: appointment,
    });
  };

  // const handleModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // };
  const handleModal = (index) => {
    const updatedModals = [...appointmentModals];
    updatedModals[index] = !updatedModals[index];
    setAppointmentModals(updatedModals);
  };

  const handleSMSModal = () => {
    setIsSMSModalOpen(!isSMSModalOpen);
  };

  useEffect(() => {
    filterAppointments(searchUsername, searchDate);
  }, [searchUsername, searchDate]);

  return (
    <Container>
      <Wrapper>
        <Header>예약관리</Header>

        <Modal isOpen={isSMSModalOpen} handleModal={handleSMSModal}>
          <SendSMS />
        </Modal>

        <Search>
          <LabelContainer>
            <LabelWrapper>
              <label>날짜 검색:</label>
              <Input
                type="date"
                value={searchDate}
                onChange={handleDateChange}
              />
            </LabelWrapper>
            <LabelWrapper>
              <label>환자명 검색:</label>
              <Input
                type="text"
                value={searchUsername}
                onChange={handleUsernameChange}
              />
            </LabelWrapper>
          </LabelContainer>
        </Search>
        {filteredAppointments.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <Th>예약번호</Th>
                <Th>환자명</Th>
                <Th>날짜</Th>
                <Th>시간</Th>
                <Th>전화번호</Th>
                <Th>예약확정 체크하기</Th>
                <Th>진료비 청구 체크하기</Th>
                <Th></Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment, index) => (
                <tr key={appointment.id}>
                  <Td>{appointment.id}</Td>
                  <Td>{appointment.name}</Td>
                  <Td>{appointment.reservationDate}</Td>
                  <Td>{appointment.reservationTime}</Td>
                  <Td>{appointment.phoneNumber}</Td>
                  <Td>
                    <Button
                      width="120px"
                      height="30px"
                      padding="0"
                      fontSize="12px"
                      onClick={handleSMSModal}
                    >
                      예약 확정 문자
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      width="130px"
                      height="30px"
                      padding="0"
                      fontSize="12px"
                      onClick={() => handleClickBillingButton(appointment)}
                    >
                      진료비 청구하기
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      width="100px"
                      height="30px"
                      padding="0"
                      fontSize="12px"
                      onClick={() =>
                        navigate(`/medicalcaremanagement/${appointment.id}`)
                      }
                    >
                      진료관리 가기
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      width="100px"
                      height="30px"
                      padding="0"
                      fontSize="12px"
                      onClick={() => handleModal(index)}
                    >
                      건강체크 확인
                    </Button>
                    <Modal
                      isOpen={appointmentModals[index]}
                      handleModal={() => handleModal(index)}
                    >
                      <SelfDiagnosisComponent id={appointment.id} />
                    </Modal>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div>
            <h4>검색 결과가 없습니다.</h4>
          </div>
        )}
      </Wrapper>
    </Container>
  );
};
const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 1300px;
  min-height: calc(100vh - 100px);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 1500px;
  padding: 100px 200px;
  border-radius: 20px;
`;
const Header = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 25px;
`;
const Search = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  padding: 2rem;
`;
const LabelContainer = styled.div`
  display: flex;
  padding: 1.5rem;
  justify-content: space-between;
  margin-right: 5rem;
  width: 100%;
  &:last-child {
    margin-right: 0;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Input = styled.input`
  width: 60%; /* 입력 필드 너비 설정 */
`;
const Table = styled.table`
  border: 1px solid gray;
  width: 80%;
  margin-top: 2rem;
  white-space: nowrap;
`;

const Th = styled.th`
  border: 1px solid gray;
  padding: 8px;
  background-color: #f5f5f5;
`;

const Td = styled.td`
  border: 1px solid gray;
  padding: 8px;
  text-align: center;
`;

export default AdminAppointmentComponent;
