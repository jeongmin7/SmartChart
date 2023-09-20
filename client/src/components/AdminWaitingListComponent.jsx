import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const appointment = [
  {
    id: 31,
    reservationTime: "09:00:00",
    reservationDate: "2023-09-01",
    patientName: "watch",
  },
  {
    id: 13,
    reservationTime: "10:00:00",
    reservationDate: "2023-09-02",
    patientName: "watch",
  },
  {
    id: 19,
    reservationTime: "15:00:00",
    reservationDate: "2023-08-14",
    patientName: "watch",
  },
  {
    id: 21,
    reservationTime: "18:00:00",
    reservationDate: "2023-08-26",
    patientName: "watch",
  },
];

function compareAppointments(appointment1, appointment2) {
  // 먼저 reservationDate를 비교합니다.
  const dateComparison = appointment1.reservationDate.localeCompare(
    appointment2.reservationDate,
  );

  // reservationDate가 같은 경우 reservationTime을 비교합니다.
  if (dateComparison === 0) {
    return appointment1.reservationTime.localeCompare(
      appointment2.reservationTime,
    );
  }

  // reservationDate가 다른 경우 dateComparison 값을 반환합니다.
  return dateComparison;
}

const AdminWaitingListComponent = () => {
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = String(currentTime.getMonth() + 1).padStart(2, "0");
  const day = String(currentTime.getDate()).padStart(2, "0");

  const today = `${year}-${month}-${day}`;

  const sortedAppointments = appointment.sort(compareAppointments);
  const [tasks, setTasks] = useState({
    대기중: sortedAppointments,
    진료중: [],
    완료: [],
  });
  console.log(tasks);

  const handleDragStart = (e, appointment, status) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ appointment, status }),
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const { appointment, status } = JSON.parse(data);

    if (status !== targetStatus) {
      const updatedTasks = {
        ...tasks,
        [status]: tasks[status].filter((apt) => apt.id !== appointment.id), // 기존 상태에서 해당 약속 제거
        [targetStatus]: [...tasks[targetStatus], appointment],
      };

      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); // 읽어온 값 tasks초기화
    }
  }, []);

  return (
    <>
      <Header>환자 대기 관리</Header>
      <Container>
        <Today>{today}</Today>
        <ColumnContainer>
          {Object.keys(tasks).map((status) => (
            <Column
              key={status}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
            >
              <Title>{status}</Title>
              {tasks[status].map((appointment) => (
                <Appointment
                  key={appointment.patientName}
                  draggable
                  onDragStart={(e) => handleDragStart(e, appointment, status)}
                >
                  <DateText>{appointment.reservationDate}</DateText>
                  <Info>
                    <StyledP>{appointment.patientName}</StyledP>
                    <StyledP>{appointment.reservationTime}</StyledP>
                  </Info>
                </Appointment>
              ))}
            </Column>
          ))}
        </ColumnContainer>
      </Container>
    </>
  );
};

const Header = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Today = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: gray;
  color: #fff;
  font-weight: 700;
  font-size: 1.5rem;
  border-radius: 5px 5px 0 0;
  height: 3rem;
`;

const ColumnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  flex: 1;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-left: 1rem;
  padding: 20px;
  border-radius: 5px;

  &:first-child {
    margin-left: 0;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 2rem;
  background-color: #f5f5f5;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Appointment = styled.div`
  margin: 10px 0;
  padding: 5px;
  background-color: gray;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const DateText = styled.p`
  font-weight: bold;
  font-size: 1rem;
  color: #fff;
  background-color: gray;
  margin-bottom: 5px;
`;

const Info = styled.div`
  background-color: #fff;
  border-radius: 5px;
`;

const StyledP = styled.p`
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default AdminWaitingListComponent;
