import React from "react";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../stores/userInfo";
import { styled } from "styled-components";

const MypageComponent = () => {
  const userInfo = useRecoilValue(userInfoAtom);
  const columns = ["", "병원명", "예약 날짜", "예약시간", "예약 상태", "취소"];
  const appointmentInfo = [
    {
      n: 1,
      hospitalName: "차앤박",
      date: "2023-10-20",
      time: "17:00",
      status: "확정",
      cancel: "false",
    },
  ];
  return (
    <div>
      <div>환자 이름:</div>
      {userInfo.username}
      <div>
        성별: <input value={userInfo.gender} />
      </div>
      <div>
        나이: <input value={userInfo.age} />
      </div>
      <div>
        전화번호: <input value={userInfo.phoneNumber} />
      </div>
      <button>업데이트</button>

      <Table>
        <Thead>
          <tr>
            {columns.map((column) => (
              <Th key={column}>{column}</Th>
            ))}
          </tr>
        </Thead>
        <tbody>
          {appointmentInfo.map(
            ({ n, hospitalName, date, time, status, cancel }) => (
              <tr key={n}>
                <Td>{n}</Td>
                <Td>{hospitalName}</Td>
                <Td>{date}</Td>
                <Td>{time}</Td>
                <Td>{status}</Td>
                <Td>{cancel}</Td>
              </tr>
            ),
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default MypageComponent;
const Table = styled.table`
  border: 1px solid gray;
  border-collapse: collapse;
  width: 80%;
`;
const Thead = styled.thead`
  background-color: #f2f2f2;
  padding: 8px;
  border: 1px solid gray;
`;
const Th = styled.th`
  border-left: 1px solid gray;
  border-bottom: 1px solid gray;
  &:first-child {
    background-color: #fff;
  }
`;

const Td = styled.td`
  padding: 8px;
  border: 1px solid #ccc;
`;
