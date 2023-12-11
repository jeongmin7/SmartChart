import React from "react";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";
import { Header, Wrapper, Container } from "../styles/CommonStyle";
import Loader from "./Loader";

const AdminWaitingListComponent = ({
  today,
  isLoading,
  tasks,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) => {
  return (
    <Container>
      <Wrapper>
        <Header>환자 대기 관리</Header>
        <ColumnContainer>
          {isLoading && <Loader />}
          <Today>{today}</Today>
          <Columns>
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
          </Columns>
        </ColumnContainer>
      </Wrapper>
    </Container>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-width: 1000px;
  overflow-x: auto;
  margin-top: 100px;
`;

const Today = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: ${palette.gray.dark};
  color: #fff;
  font-weight: 700;
  font-size: 1.5rem;
  border-radius: 5px 5px 0 0;
  height: 3rem;
`;

const Columns = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 600px;
`;

const Column = styled.div`
  flex: 1;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-left: 1rem;
  padding: 20px;
  border-radius: 5px;
  min-height: 400px;
  &:first-child {
    margin-left: 0;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 2rem;
  background-color: ${palette.gray.light};
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
  background-color: ${palette.gray.dark};
  border: 1px solid ${palette.gray.border};
  border-radius: 5px;
`;

const DateText = styled.p`
  font-weight: bold;
  font-size: 1rem;
  color: #fff;
  background-color: ${palette.gray.dark};
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
