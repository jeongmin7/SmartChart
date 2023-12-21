import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "../styles/GlobalStyles";
import Modal from "../components/Modal";
import PatientBill from "../components/PatientBill";
import { Container, Header, Wrapper } from "../styles/CommonStyle";
import Loader from "../components/Loader";
import Pagination from "./Pagination";
import Button from "./Button";

const Pay = ({
  list,
  handleModal,
  handlePayment,
  isLoading,
  selectedItemId,
  isModalOpen,
}) => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(list.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedList = list.slice(startIndex, endIndex);

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <Container>
      <Wrapper>
        <Header>진료비</Header>
        <TableContainer>
          {isLoading && <Loader />}

          <TableHeader>
            <TableCell>예약번호</TableCell>
            <TableCell>병원명</TableCell>
            <TableCell>진료날짜</TableCell>
            <TableCell>환자 성명</TableCell>
            <TableCell>총 금액</TableCell>
            <TableCell>진료비 납부상태</TableCell>
            <TableCell>진료비 보기</TableCell>
            <TableCell>진료비 내기</TableCell>
          </TableHeader>

          <TableBody>
            {displayedList.length === 0 && <Nothing>내역이 없습니다.</Nothing>}
            {displayedList.map((item, itemIndex) => (
              <TableRow key={itemIndex}>
                <TableCell>{item.id}</TableCell>
                <TableCell textLength={item.hospitalName.length}>
                  {item.hospitalName}
                </TableCell>
                <TableCell>{item.reservationDate}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.sum}원</TableCell>
                <TableCell
                  isInComplete={item.patientPaymentStatus === "미완료"}
                >
                  {item.patientPaymentStatus}
                </TableCell>
                <ButtonContainer>
                  <Button
                    width="80px"
                    height="15px"
                    fontSize="10px"
                    borderRadius="5px"
                    onClick={() => handleModal(item.id)}
                  >
                    진료비 보기
                  </Button>
                </ButtonContainer>
                <ButtonContainer>
                  <Button
                    width="80px"
                    height="15px"
                    fontSize="10px"
                    borderRadius="5px"
                    disabled={item.patientPaymentStatus === "완료"}
                    onClick={() => handlePayment(item.id)}
                  >
                    진료비 내기
                  </Button>
                </ButtonContainer>
              </TableRow>
            ))}
          </TableBody>
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

        <Modal isOpen={isModalOpen} handleModal={handleModal}>
          <PatientBill id={selectedItemId} />
        </Modal>
      </Wrapper>
    </Container>
  );
};
export default Pay;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px 0;
  width: 1000px;
  position: relative;
`;

const TableHeader = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  background-color: ${palette.gray.light};
  border-top: 1px solid ${palette.gray.border};
  border-bottom: 1px solid ${palette.gray.border};
  padding: 10px;
  & > div {
    flex: 1;
    padding: 5px;
  }
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;
`;

const TableRow = styled.div`
  display: flex;
  margin: 5px 0px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${palette.gray.border};
  & > div {
    flex: 1;
    padding: 5px;
    align-items: center;
    text-align: center;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: bold;
  font-size: 16px;
  white-space: nowrap;
  font-size: ${({ textLength }) => (textLength > 9 ? "12px" : "16px")};
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ isInComplete }) => (isInComplete ? "red" : "")};
  &:first-child {
    flex: 0.6;
  }
  &:nth-child(2) {
    flex: 2;
  }
  &:nth-child(6) {
    flex: 1.2;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const Nothing = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
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
