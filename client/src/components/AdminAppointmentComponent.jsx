import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const AdminAppointmentComponent = () => {
  const appointments = [
    {
      id: 1,
      username: "김",
      date: "2023-08-20",
      time: "09:00-10:00",
      tel: "010-0000-0000",
    },
    {
      id: 2,
      username: "이",
      date: "2023-08-21",
      time: "15:00-16:00",
      tel: "010-1111-1111",
    },
    {
      id: 3,
      username: "박",
      date: "2023-08-11",
      time: "11:00-12:00",
      tel: "010-1111-1111",
    },
    {
      id: 4,
      username: "홍",
      date: "2023-08-16",
      time: "14:00-15:00",
      tel: "010-1111-1111",
    },
  ];

  const [searchUsername, setSearchUsername] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

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
      const nameMatch = appointment.username.includes(username);
      const dateMatch = appointment.date.includes(date);
      return nameMatch && dateMatch;
    });

    setFilteredAppointments(filtered);
  };

  useEffect(() => {
    filterAppointments(searchUsername, searchDate);
  }, [searchUsername, searchDate]);

  return (
    <Container>
      <Wrapper>
        <Header>예약관리</Header>
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
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <Td>{appointment.id}</Td>
                  <Td>{appointment.username}</Td>
                  <Td>{appointment.date}</Td>
                  <Td>{appointment.time}</Td>
                  <Td>{appointment.tel}</Td>
                  <Td>
                    <Button
                      width="100px"
                      height="30px"
                      padding="0"
                      fontSize="12px"
                      onClick={() =>
                        alert(`${appointment.tel}번으로 문자를 보냈습니다.`)
                      }
                    >
                      예약 확정 문자
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      width="100px"
                      height="30px"
                      padding="0"
                      fontSize="12px"
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
                    >
                      건강체크 확인
                    </Button>
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
  min-width: 900px;
  min-height: calc(100vh - 100px);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
  padding: 100px 200px 100px;
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
  margin-top: 4rem;
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
  margin-top: 5rem;
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
