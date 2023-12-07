import React from "react";
import {
  TableHeader,
  TableContainer,
  TableRow,
  TableCell,
} from "../../styles/TableStyle";

const Table = ({ tableData }) => {
  return (
    <TableContainer>
      <TableHeader>
        <TableCell>날짜</TableCell>
        <TableCell>환자수</TableCell> <TableCell>총 수입</TableCell>
        {/* 여성환자수, 남성환자수, 평균나이 필수 조건이 아닌 경우에만 렌더링 */}
        {tableData.some((data) => "femaleCount" in data) && (
          <TableCell>여성 환자</TableCell>
        )}
        {tableData.some((data) => "maleCount" in data) && (
          <TableCell>남성 환자</TableCell>
        )}
        {tableData.some((data) => "averageAge" in data) && (
          <TableCell>평균나이</TableCell>
        )}
      </TableHeader>
      {tableData.map((data, idx) => (
        <TableRow key={idx}>
          {data.start && <TableCell>{data.start}</TableCell>}
          {data.date && <TableCell>{data.date}</TableCell>}
          {data.year_MONTH && <TableCell>{data.year_MONTH}</TableCell>}
          {data.year && <TableCell>{data.year}</TableCell>}
          {typeof data.patientCount === "number" && (
            <TableCell>{data.patientCount}명</TableCell>
          )}
          {typeof data.sum === "number" && <TableCell>{data.sum}원</TableCell>}
          {typeof data.femaleCount === "number" && (
            <TableCell>{data.femaleCount}명</TableCell>
          )}
          {typeof data.maleCount === "number" && (
            <TableCell>{data.maleCount}명</TableCell>
          )}
          {typeof data.averageAge === "number" && (
            <TableCell>{data.averageAge}세</TableCell>
          )}
        </TableRow>
      ))}
    </TableContainer>
  );
};

export default Table;
