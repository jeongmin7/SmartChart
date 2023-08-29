import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const appointment = [
  { username: "김", date: "2023-08-12", time: "12:00 - 13:00" },
  { username: "이", date: "2023-08-12", time: "09:00 - 10:00" },
  { username: "박", date: "2023-08-12", time: "11:00 - 12:00" },
  { username: "홍", date: "2023-08-12", time: "13:00 - 14:00" },
  { username: "정", date: "2023-08-12", time: "15:00 - 16:00" },
];

function compareDates(a, b) {
  const dateA = new Date(`${a.date} ${a.time.split(" - ")[0]}`);
  const dateB = new Date(`${b.date} ${b.time.split(" - ")[0]}`);
  return dateA - dateB;
}

const AdminWaitingListComponent = () => {
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = String(currentTime.getMonth() + 1).padStart(2, "0");
  const day = String(currentTime.getDate()).padStart(2, "0");

  const today = `${year}-${month}-${day}`;

  const sortedAppointments = appointment.sort(compareDates);

  const [tasks, setTasks] = useState({
    대기중: sortedAppointments,
    진료중: [],
    완료: [],
  });

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
        [status]: tasks[status].filter(
          (apt) => apt.username !== appointment.username,
        ),
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
                  key={appointment.username}
                  draggable
                  onDragStart={(e) => handleDragStart(e, appointment, status)}
                >
                  <DateText>{appointment.date}</DateText>
                  <Info>
                    <StyledP>{appointment.username}</StyledP>
                    <StyledP>{appointment.time}</StyledP>
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
