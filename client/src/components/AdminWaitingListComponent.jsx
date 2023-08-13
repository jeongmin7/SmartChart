import React from "react";
import { styled } from "styled-components";

const appointment = [
  { username: "김", date: "2023-08-12", time: "12:00 - 13:00" },
  { username: "이", date: "2023-09-23", time: "09:00 - 10:00" },
  { username: "박", date: "2023-07-02", time: "11:00 - 12:00" },
  { username: "홍", date: "2023-08-10", time: "13:00 - 14:00" },
  { username: "정", date: "2023-08-19", time: "15:00 - 16:00" },
];

const AdminWaitingListComponent = () => {
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = String(currentTime.getMonth() + 1).padStart(2, "0");
  const day = String(currentTime.getDate()).padStart(2, "0");

  const today = `${year}-${month}-${day}`;

  const columns = {
    대기중: [],
    진료중: [],
    완료: [],
  };

  appointment.forEach((appointment) => {
    const { username, date, time } = appointment;
    const appointmentTime = new Date(`${date} ${time.split(" - ")[0]}`);
    const status =
      currentTime < appointmentTime
        ? "대기중"
        : currentTime > appointmentTime
        ? "완료"
        : "진료중";

    const task = (
      <Appointment key={username}>
        <DateText>{date}</DateText>
        <Info>
          <StyledP>{username}</StyledP>
          <StyledP>{time}</StyledP>
        </Info>
      </Appointment>
    );

    columns[status].push(task);
  });

  return (
    <Container>
      <Today>{today}</Today>
      <ColumnContainer>
        {Object.keys(columns).map((status) => (
          <Column key={status}>
            <Title>{status}</Title>
            {columns[status]}
          </Column>
        ))}
      </ColumnContainer>
    </Container>
  );
};

export default AdminWaitingListComponent;
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
