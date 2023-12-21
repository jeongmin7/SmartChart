import React from "react";
import styled from "styled-components";
import { palette } from "../styles/GlobalStyles";
import Modal from "../components/Modal";
import PatientBill from "../components/PatientBill";
import { Container, Header, Wrapper } from "../styles/CommonStyle";
import Loader from "../components/Loader";

const Pay = ({
  list,
  handleModal,
  handlePayment,
  isLoading,
  selectedItemId,
  isModalOpen,
}) => {
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
            {list.length === 0 && <Nothing>내역이 없습니다.</Nothing>}
            {list.map((item, itemIndex) => (
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
                  <Button onClick={() => handleModal(item.id)}>
                    진료비 보기
                  </Button>
                </ButtonContainer>
                <ButtonContainer>
                  <Button
                    width="80px"
                    fontSize="12px"
                    padding="5px"
                    borderRadius="7px"
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
  & > div {
    flex: 1;
    padding: 5px;
    align-items: center;
    text-align: center;
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
`;
const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  background-color: ${({ disabled }) =>
    disabled ? "#b0b0b0" : palette.primary.blue};
  border: none;
  border-radius: 7px;
  padding: 5px;
  color: ${({ disabled }) => (disabled ? "#666" : palette.white)};
  font-weight: 700;
  display: flex;
  width: 80px;
  font-size: 12px;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
export const Nothing = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
`;
