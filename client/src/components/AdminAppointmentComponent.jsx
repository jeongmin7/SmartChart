import React, { useState } from "react";
import styled from "styled-components";

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

  return (
    <Container>
      <h1>예약관리</h1>
      <Search>
        <div>
          <label>날짜 검색:</label>
          <input type="date" value={searchDate} onChange={handleDateChange} />
        </div>
        <div>
          <label>환자명 검색:</label>
          <input
            type="text"
            value={searchUsername}
            onChange={handleUsernameChange}
          />
        </div>
      </Search>
      {filteredAppointments.length > 0 && (
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
                  <button
                    onClick={() =>
                      alert(`${appointment.tel}번으로 문자를 보냈습니다.`)
                    }
                  >
                    예약 확정 문자
                  </button>
                </Td>
                <Td>
                  <button>진료비 청구하기</button>
                </Td>
                <Td>
                  <button>진료관리 가기</button>
                </Td>
                <Td>
                  <button>환자 기본 건강체크 확인</button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Nothing>
        {searchDate && filteredAppointments.length === 0 && (
          <p>검색 결과가 없습니다.</p>
        )}
      </Nothing>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  padding: 2rem;
`;
const Search = styled.div`
  display: flex;
  width: 40%;
  justify-content: space-between;
  flex-direction: row;
  padding: 2rem;
  margin-top: 9rem;
`;
const Table = styled.table`
  border: 1px solid gray;
  width: 80%;
  margin-top: 10rem;
`;

const Th = styled.th`
  border: 1px solid gray;
  padding: 8px;
`;

const Td = styled.td`
  border: 1px solid gray;
  padding: 8px;
`;
const Nothing = styled.div`
  margin-top: 10rem;
`;

export default AdminAppointmentComponent;
