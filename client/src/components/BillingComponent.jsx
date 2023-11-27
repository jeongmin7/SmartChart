import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import Invoice from "./Invoice";

const prevCost = [
  // {
  //   cost: 19914,
  //   treatment: "마취료",
  // },
  // {
  //   cost: 158094,
  //   treatment: "입원료",
  // },
  // {
  //   cost: 200000,
  //   treatment: "x-ray",
  // },
  // {
  //   cost: 400000,
  //   treatment: "물리치료",
  // },
];
const total = [
  {
    sum: 778008,
  },
];
const BillingComponent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const isDoctor = true;

  const [patientInfo, setPatientInfo] = useState([]);
  const [cost, setCost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/doctor/cost-view/${id}`);
        setPatientInfo(response.data.data[0]);
        setCost(response.data.data2);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container>
      <Header>의료비 청구</Header>
      <Invoice
        patientInfo={patientInfo}
        id={id}
        total={total}
        cost={cost}
        prevCost={prevCost}
        isDoctor={isDoctor}
      />
    </Container>
  );
};

export default BillingComponent;

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
