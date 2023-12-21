import React, { useEffect, useState } from "react";
import {
  TableHeader,
  TableRow,
  TableCell,
  TableContainer,
} from "../../styles/TableStyle";
import Pagination from "../Pagination";
import styled from "styled-components";
import { palette } from "../../styles/GlobalStyles";

const Table = ({ tableData, selectedChart }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedList = tableData.slice(startIndex, endIndex);

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    handlePage(1);
  }, [selectedChart]);

  return (
    <Container>
      <TableContainer>
        <TableHeader>
          <TableCell>날짜</TableCell>
          <TableCell>환자수</TableCell> <TableCell>총 수입</TableCell>
          {/* 여성환자수, 남성환자수, 평균나이 필수 조건이 아닌 경우에만 렌더링 */}
          {displayedList.some((data) => "femaleCount" in data) && (
            <TableCell>여성 환자</TableCell>
          )}
          {displayedList.some((data) => "maleCount" in data) && (
            <TableCell>남성 환자</TableCell>
          )}
          {displayedList.some((data) => "averageAge" in data) && (
            <TableCell>평균나이</TableCell>
          )}
        </TableHeader>
        {displayedList.map((data, idx) => (
          <TableRow key={idx}>
            {data.start && <TableCell>{data.start}</TableCell>}
            {data.date && <TableCell>{data.date}</TableCell>}
            {data.year_MONTH && <TableCell>{data.year_MONTH}</TableCell>}
            {data.year && <TableCell>{data.year}</TableCell>}
            {typeof data.patientCount === "number" && (
              <TableCell>{data.patientCount}명</TableCell>
            )}
            {typeof data.sum === "number" && (
              <TableCell>{data.sum}원</TableCell>
            )}
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
      <Pagination>
        {Array.from({ length: totalPages }).map((_, index) => (
          <PageNumber
            key={index + 1}
            onClick={() => handlePage(index + 1)}
            isActive={currentPage === index + 1}
          >
            {index + 1}
          </PageNumber>
        ))}
      </Pagination>
    </Container>
  );
};

export default Table;
const Container = styled.div`
  width: 100%;
  height: 320px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PageNumber = styled.div`
  margin: 0 5px;
  padding: 5px;
  cursor: pointer;
  background-color: ${({ isActive }) =>
    isActive ? `${palette.gray.light}` : `#fff`};
  border-radius: 5px;
  &:hover {
    background-color: #ddd;
  }
`;
