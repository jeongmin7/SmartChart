import React, { useState } from "react";
import BillingComponent from "../components/BillingComponent";
import Button from "../components/Button";
import Modal from "../components/Modal";
import TreatmentAndCost from "../components/TreatmentAndCost";
import styled from "styled-components";

const BillingContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <Container>
      <BillingComponent />
      <Buttons>
        <Button borderRadius="15px" width="100px">
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
  margin: 10px 0;
  justify-content: center;
  align-items: center;
`;
