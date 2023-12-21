import React, { useState } from "react";
import { styled } from "styled-components";
import Button from "./Button";
import { palette } from "../styles/GlobalStyles";
import Loader from "./Loader";
import { Container, Wrapper } from "../styles/CommonStyle";
import { Nothing } from "./PayComponent";
import Pagination from "./Pagination";

const MypageComponent = ({
  userInfo,
  appointmentList,
  isLoading,
  handleChange,
  handleUpdate,
  cancelReservation,
}) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(appointmentList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedList = appointmentList.slice(startIndex, endIndex);
  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <Container>
      <Wrapper>
        <Header>마이페이지</Header>
        {isLoading && <Loader />}

        <FirstColumnHalfWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>환자이름:</InfoTitle>
              <div>{userInfo.name}</div>
            </RowDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>성별:</InfoTitle>
              {userInfo.gender === null ? (
                <div> 성별을 정정해주세요 </div>
              ) : (
                <div>{userInfo.gender}</div>
              )}
            </RowDivideWrapper>
          </ColumnDivideWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>나이:</InfoTitle>
              <div>{userInfo.age}</div>
            </RowDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>전화번호:</InfoTitle>
              <InfoValue
                type="text"
                value={userInfo.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
            </RowDivideWrapper>
          </ColumnDivideWrapper>
          <Tip>
            **전화번호 변경시 기존번호를 클릭하시고 새로운 번호를 입력하신 후
            아래의 업데이트 버튼을 눌러주세요.**
          </Tip>
        </FirstColumnHalfWrapper>
        <Button
          width="80px"
          height="40px"
          padding="10px"
          fontSize="15px"
          borderRadius="5px"
          marginTop="30px"
          onClick={handleUpdate}
        >
          Update
        </Button>
        <ColumnHalfWrapper>
          <Title>진료내역</Title>
          <TableContainer>
            <TableHeader>
              <TableCell>예약번호</TableCell>
              <TableCell>병원명</TableCell>
              <TableCell>예약 날짜</TableCell>
              <TableCell>예약 시간</TableCell>
              <TableCell>예약 상태</TableCell>
              <TableCell>예약 취소</TableCell>
            </TableHeader>
            {displayedList.length > 0 ? (
              <>
                {displayedList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.hospitalName}</TableCell>
                    <TableCell>{item.reservationDate}</TableCell>
                    <TableCell>{item.reservationTime}</TableCell>
                    <TableCell
                      isIncomplete={item.reservationStatus === "미완료"}
                    >
                      {item.reservationStatus}
                    </TableCell>

                    <TableCell>
                      <Button
                        padding="10px 5px"
                        fontSize="15px"
                        borderRadius="5px"
                        onClick={() => cancelReservation(item.id)}
                      >
                        예약 취소
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <Nothing>예약 내역이 없습니다.</Nothing>
            )}
          </TableContainer>
        </ColumnHalfWrapper>
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
      </Wrapper>
    </Container>
  );
};

export default MypageComponent;

const Tip = styled.div`
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10px;
  color: #3498db;
  font-weight: 600;
`;
const Header = styled.div`
  font-weight: bold;
  font-size: 25px;
  width: 100%;
  text-align: center;
  margin-top: 40px;
`;

const ColumnHalfWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 30px;
`;

const ColumnDivideWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const FirstColumnHalfWrapper = styled(ColumnHalfWrapper)`
  border: 0.5px solid ${palette.gray.dark};
  width: 80%;
  border-radius: 5px;
  margin-top: 20px;
`;

const RowDivideWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 16px;
  padding: 20px;
`;

const InfoTitle = styled.div`
  width: 30%;
`;

const InfoValue = styled.input`
  width: 60%;
  border: none;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  display: flex;
  justify-content: center;
`;
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  margin: auto;
  margin-top: 20px;
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ccc;
  font-weight: 500;
  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled(TableRow)`
  font-weight: 700;
  font-size: 18px;
  background-color: #f0f0f0;
  display: flex;
  padding: 8px;
`;

const TableCell = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.isIncomplete ? "#FF0000" : "")};
  &:first-child {
    flex: 0.5;
  }
  &:nth-child(2) {
    flex: 2;
  }
  &:nth-child(3),
  &:nth-child(4),
  &:nth-child(5) {
    flex: 1.2;
  }
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
