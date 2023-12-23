import React, { useState } from "react";
import BillingComponent from "../components/BillingComponent";
import Button from "../components/Button";
import Modal from "../components/Modal";
import TreatmentAndCost from "../components/TreatmentAndCost";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { invoiceAtom } from "../stores/invoiceAtom";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { billingStatusAtom } from "../stores/billingStatusAtom";
const BillingContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reservationId = location.state.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const invoiceDetail = useRecoilValue(invoiceAtom);
  const [billingStatus, setBillingStatus] = useRecoilState(billingStatusAtom);
  const handleSaveButton = () => {
    try {
      axios.post(`/doctor/treatment_statement`, invoiceDetail);
      toast.success("저장되었습니다.");
      setBillingStatus((prevStatus) => ({
        ...prevStatus,
        [reservationId]: true,
      }));
      navigate("/adminAppointment");
    } catch (error) {
      toast.error("저장되지 않았습니다.");
    }
  };
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <Container>
      <BillingComponent />
      <Buttons>
        <Button borderRadius="15px" width="100px" onClick={handleSaveButton}>
          저장
        </Button>
        <Button onClick={handleModal}>기본 치료비 책정하기</Button>
        <Modal isOpen={isModalOpen} handleModal={handleModal}>
          <TreatmentAndCost />
        </Modal>
      </Buttons>
    </Container>
  );
};

export default BillingContainer;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
const Buttons = styled.div`
  display: flex;
  gap: 100px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
