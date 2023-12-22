import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import Invoice from "./Invoice";
import { toast } from "react-toastify";
import Loader from "./Loader";
import Button from "./Button";
import TreatmentAndCost from "./TreatmentAndCost";
import Modal from "./Modal";
import { useRecoilValue } from "recoil";
import { userRoleAtom } from "../stores/userInfo";

const BillingComponent = ({ handleModal, handleSaveButton }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const userRole = useRecoilValue(userRoleAtom);
  const isDoctor = userRole.role === "DOCTOR";
  const [patientInfo, setPatientInfo] = useState([]);
  const [cost, setCost] = useState([]);
  const [prevCost, setPrevCost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFields, setSelectedFields] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/doctor/cost-view/${id}`);
        setPatientInfo(response.data.data[0]);
        setCost(response.data.data2);
        setPrevCost(response.data.data3);
        setIsLoading(false);
      } catch (error) {
        toast.error("데이터를 읽어오는데 실패했습니다.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container>
      <Header>의료비 청구</Header>
      {isLoading && <Loader />}
      <Invoice
        patientInfo={patientInfo}
        id={id}
        cost={cost}
        prevCost={prevCost}
        isDoctor={isDoctor}
        selectedFields={selectedFields}
        setSelectedFields={setSelectedFields}
        userRole={userRole}
      />
      <Buttons>
        <Button
          borderRadius="15px"
          width="100px"
          onClick={handleSaveButton}
          disabled={isDoctor && selectedFields.length === 0}
        >
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

export default BillingComponent;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 1300px;
  height: auto;
`;

const Header = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 25px;
  margin-top: 100px;
`;
const Buttons = styled.div`
  display: flex;
  gap: 100px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
