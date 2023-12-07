import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import SelfDiagnosisComponent from "./SelfDiagnosisComponent";
import SendSMS from "./SendSMS";
import axios from "axios";
import { Container, Header, Wrapper } from "../styles/CommonStyle";
import { toast } from "react-toastify";
import Loader from "./Loader";
import {
  TableHeader,
  TableContainer,
  TableRow,
  TableCell,
} from "../styles/TableStyle";

const AdminAppointmentComponent = () => {
  const navigate = useNavigate();
  const [searchUsername, setSearchUsername] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [isSMSModalOpen, setIsSMSModalOpen] = useState(false);
  const [SMSInfo, setSMSInfo] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [appointmentModals, setAppointmentModals] = useState(
    appointments.map(() => false)
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/doctor/reservation-view", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setAppointments(response.data.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("데이터를 읽어오는데 실패했습니다.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
      const nameMatch = username ? appointment.name.includes(username) : true;
      const dateMatch = date
        ? appointment.reservationDate.includes(date)
        : true;
      return nameMatch && dateMatch;
    });

    setFilteredAppointments(filtered);
  };

  const handleClickBillingButton = (appointment) => {
    navigate(`/billing?id=${appointment.id}`, {
      state: appointment,
    });
  };

  const handleModal = (index) => {
    const updatedModals = [...appointmentModals];
    updatedModals[index] = !updatedModals[index];
    setAppointmentModals(updatedModals);
  };

  const handleSMSModal = ({ appointment } = {}) => {
    setIsSMSModalOpen(!isSMSModalOpen);
    setSMSInfo(appointment);
  };

  useEffect(() => {
    filterAppointments(searchUsername, searchDate);
  }, [searchUsername, searchDate, appointments]);
  return (
    <Container>
      <Wrapper>
        <Header>예약관리</Header>
        {isLoading && <Loader />}
        <Modal isOpen={isSMSModalOpen} handleModal={handleSMSModal}>
          <SendSMS SMSInfo={SMSInfo} />
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
                <TableCell>예약번호</TableCell>
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
                  <TableCell>{appointment.id}</TableCell>
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
                      onClick={() => handleSMSModal({ appointment })}
                    >
                      예약 확정 문자
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      padding="5px 10px"
                      fontSize="11px"
                      borderRadius="5px"
                      whiteSpace="nowrap"
                      onClick={() => handleClickBillingButton(appointment)}
                    >
                      진료비 청구
                    </Button>
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

export default AdminAppointmentComponent;
