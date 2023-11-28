import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import Invoice from "./Invoice";
import { toast } from "react-toastify";

const PatientBill = ({ id }) => {
  const [detailCost, setDetailCost] = useState([]);
  const [patient, setPatient] = useState({});
  const [total, setTotal] = useState(0);
  const isDoctor = false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "/patient/cost",
          {
            reservationId: id,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setDetailCost(response.data.data2);
        setPatient(response.data.data[0]);
        setTotal(response.data.date3[0].sum);
      } catch (error) {
        toast.error("데이터를 읽어오는데 실패했습니다.");
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Header>의료비 청구</Header>
      <Invoice
        isDoctor={isDoctor}
        detailCost={detailCost}
        patientInfo={patient}
        sum={total}
        id={id}
      />
    </Container>
  );
};

export default PatientBill;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 1300px;
  min-height: calc(100vh - 150px);
`;

const Header = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 25px;
`;
