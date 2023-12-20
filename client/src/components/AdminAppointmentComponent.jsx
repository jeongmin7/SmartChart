import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import Modal from "./Modal";
import SelfDiagnosisComponent from "./SelfDiagnosisComponent";
import SendSMS from "./SendSMS";
import { Container, Header, Wrapper } from "../styles/CommonStyle";
import Loader from "./Loader";
import {
  TableHeader,
  TableContainer,
  TableRow,
  TableCell,
} from "../styles/TableStyle";

const AdminAppointmentComponent = ({
  searchUsername,
  searchDate,
  filteredAppointments,
  isSMSModalOpen,
  SMSInfo,
  appointments,
  appointmentModals,
  isLoading,
  handleUsernameChange,
  handleDateChange,
  handleClickBillingButton,
  handleModal,
  handleSMSModal,
  setIsSMSModalOpen,
  setIsSend,
  isCompletedBills,
}) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <Header>예약관리</Header>
        {isLoading && <Loader />}
        <Modal isOpen={isSMSModalOpen} handleModal={handleSMSModal}>
          <SendSMS
            SMSInfo={SMSInfo}
            setIsSMSModalOpen={setIsSMSModalOpen}
            setIsSend={setIsSend}
          />
        </Modal>
        <ResultContainer>
          <Search>
            <LabelContainer>
              <LabelWrapper>
                <SearchLabel>날짜 검색:</SearchLabel>
                <Input
                  type="date"
                  value={searchDate}
                  onChange={handleDateChange}
                />
              </LabelWrapper>
              <LabelWrapper>
                <SearchLabel>환자명 검색:</SearchLabel>
                <Input
                  type="text"
                  value={searchUsername}
                  onChange={handleUsernameChange}
                />
              </LabelWrapper>
            </LabelContainer>
          </Search>
          {filteredAppointments.length > 0 ? (
            <TableContainer>
              <TableHeader>
                <TableCell id={true}>예약번호</TableCell>
                <TableCell>환자명</TableCell>
                <TableCell>날짜</TableCell>
                <TableCell>시간</TableCell>
                <TableCell>전화번호</TableCell>
                <TableCell>예약확정 체크</TableCell>
                <TableCell>진료비 청구</TableCell>
                <TableCell>진료관리</TableCell>
                <TableCell>건강체크</TableCell>
              </TableHeader>
              {filteredAppointments.map((appointment, index) => (
                <TableRow key={appointment.id}>
                  <TableCell id={true}>{appointment.id}</TableCell>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{appointment.reservationDate}</TableCell>
                  <TableCell>{appointment.reservationTime}</TableCell>
                  <TableCell>{appointment.phoneNumber}</TableCell>
                  <TableCell>
                    <Button
                      padding="5px 10px"
                      fontSize="11px"
                      borderRadius="5px"
                      whiteSpace="nowrap"
                      disabled={appointment.reservationStatus === "완료"}
                      onClick={() => handleSMSModal({ appointment })}
                    >
                      예약 확정 문자
                    </Button>
                    <Status
                      isIncomplete={appointment.reservationStatus === "미완료"}
                    >
                      {appointment.reservationStatus}
                    </Status>
                  </TableCell>
                  <TableCell>
                    <Button
                      padding="5px 10px"
                      fontSize="11px"
                      borderRadius="5px"
                      whiteSpace="nowrap"
                      disabled={
                        appointment.paymentStatus === "완료" ||
                        isCompletedBills[appointment.id]
                      }
                      onClick={() => handleClickBillingButton(appointment)}
                    >
                      진료비 청구
                    </Button>
                    <Status
                      isIncomplete={appointment.paymentStatus === "미완료"}
                    >
                      {appointment.paymentStatus}
                    </Status>
                  </TableCell>
                  <TableCell>
                    <Button
                      padding="5px 10px"
                      fontSize="11px"
                      borderRadius="5px"
                      whiteSpace="nowrap"
                      onClick={() =>
                        navigate(`/medicalcaremanagement/${appointment.id}`)
                      }
                    >
                      진료관리
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      padding="5px 10px"
                      fontSize="11px"
                      borderRadius="5px"
                      whiteSpace="nowrap"
                      onClick={() => handleModal(index)}
                    >
                      건강체크
                    </Button>
                    <Modal
                      isOpen={appointmentModals[index]}
                      handleModal={() => handleModal(index)}
                    >
                      <SelfDiagnosisComponent id={appointment.patientId} />
                    </Modal>
                  </TableCell>
                </TableRow>
              ))}
            </TableContainer>
          ) : (
            <div>
              <h4>검색 결과가 없습니다.</h4>
            </div>
          )}
        </ResultContainer>
      </Wrapper>
    </Container>
  );
};

const Search = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  padding: 2rem;
  min-width: 800px;
`;
const LabelContainer = styled.div`
  display: flex;
  padding: 1.5rem;
  justify-content: space-between;
  margin-right: 5rem;
  margin-top: 50px;
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
const SearchLabel = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  width: 60%;
  height: 30px;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 600px;
  width: 100%;
`;
const Status = styled.div`
  color: ${(props) => (props.isIncomplete ? "red" : "")};
  font-weight: 600;
  font-size: 11px;
`;

export default AdminAppointmentComponent;
