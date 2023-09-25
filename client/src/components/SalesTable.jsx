import React from "react";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";

const SalesTable = () => {
  const columns = [
    { name: "", width: "5%" },
    { name: "매출날짜", width: "20%" },
    { name: "환자수", width: "15%" },
    { name: "여성 환자 수", width: "15%" },
    { name: "남성 환자 수", width: "15%" },
    { name: "환자 평균 나이", width: "15%" },
    { name: "총 수입", width: "15%" },
  ];
  return (
    <ColumnHalfWrapper>
      <Header>이번 달 진료비 관리</Header>
      <AppointmentListTitle>
        {columns.map((column, index) => (
          <ListRowDivideWrapper width={column.width} index={index}>
            {column.name}
          </ListRowDivideWrapper>
        ))}
      </AppointmentListTitle>
      <AppointmentListBody>
        {columns.map((column, index) => (
          <ListRowDivideWrapper width={column.width} index={index}>
            {index === 0 ? (
              String(index + 1)
            ) : index === 1 ? (
              <div>매출 날짜1</div>
            ) : index === 2 ? (
              <div>환자수1</div>
            ) : index === 3 ? (
              <div>여성환자수 </div>
            ) : index === 4 ? (
              <div>남성환자수 </div>
            ) : index === 5 ? (
              <div>환자 평균나이</div>
            ) : index === 6 ? (
              <div>총수입</div>
            ) : (
              column.name
            )}
          </ListRowDivideWrapper>
        ))}
      </AppointmentListBody>
    </ColumnHalfWrapper>
  );
};

export default SalesTable;

const Header = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 16px;
  width: 100%;
  text-align: center;
`;
const ColumnHalfWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: auto;
  margin: 30px 0;
`;

const AppointmentListTitle = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  background-color: ${palette.gray.light};
  border-top: 1px solid ${palette.gray.border};
  border-bottom: 1px solid ${palette.gray.border};
`;
const AppointmentListBody = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  border-bottom: 1px solid ${palette.gray.border};
`;

const ListRowDivideWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    (props.index === 0 || props.index === 5 || props.index === 6) && "center"};
  width: ${(props) => (props.width ? props.width : "100%")};
  height: 100%;
  font-weight: bold;
  font-size: 16px;
  border-left: ${(props) =>
    props.index !== 0 && `1px solid ${palette.gray.border}`};
  padding-left: ${(props) =>
    props.index !== 0 && props.index !== 5 && props.index !== 6 && "10px"};
  background-color: ${(props) =>
    props.index === 0 ? palette.gray.light : "transparent"};
`;
