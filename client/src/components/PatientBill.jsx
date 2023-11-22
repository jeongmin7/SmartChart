import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";
import axios from "axios";
import Invoice from "./\bInvoice";

const PatientBill = ({ id }) => {
  const [detailCost, setDetailCost] = useState([]);
  const [patient, setPatient] = useState({});
  const [total, setTotal] = useState(0);
  const isDoctor = false;
  console.log("id", id);
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
        console.error(error);
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
      {/* <Wrapper>
        <GridItem header="true">
          <Section>진료비</Section>
        </GridItem>

        <GridContainer>
          <GridItem>
            <Title>예약번호</Title>
            <Content>{id}</Content>
          </GridItem>
          <GridItem>
            <Title>병원명</Title>
            <Content>{patient.hospitalName}</Content>
          </GridItem>
          <GridItem>
            <Title>진료날짜</Title>
            <Content>{patient.reservationDate}</Content>
          </GridItem>
          <GridItem>
            <Title>환자성명</Title>
            <Content>{patient.name}</Content>
          </GridItem>
          <GridItem>
            <Title>환자 전화번호</Title>
            <Content>{patient.phoneNumber}</Content>
          </GridItem>
          <GridItem>
            <Title>환자 성별</Title>
            <Content>{patient.gender}</Content>
          </GridItem>
          <GridItem>
            <Title>환자 나이</Title>
            <Content>{patient.age}</Content>
          </GridItem>
          <GridItem></GridItem>
        </GridContainer>
        <GridItem header="true" className="borderTop">
          <Section>치료 내역서</Section>
        </GridItem>
        <GridContainer detail="true">
          {detailCost.length !== 0 ? (
            <div>
              {detailCost.map(({ treatment, cost }, index) => (
                <GridItem key={index} type="text" title="true">
                  <StyledInput title="true">{treatment}</StyledInput>
                  <StyledInput>{cost}원</StyledInput>
                </GridItem>
              ))}
              <GridItem className="noBorderBottom">
                <Title>총금액</Title>
                <Content>{total}원</Content>
              </GridItem>
            </div>
          ) : (
            ""
          )}

          {detailCost.length === 0 && (
            <GridItem className="noBorderBottom">
              <Title>총금액</Title>
              <Content>{total}원</Content>
            </GridItem>
          )}
        </GridContainer>
      </Wrapper> */}
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
  max-width: 1500px;
  border: 2px solid ${palette.primary.black};
`;
const Header = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 25px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.detail ? "none" : "repeat(4, 1fr)"};
  width: 100%;
  /* max-width: 800px; */
  margin: 0 auto;
`;
const GridItem = styled.div`
  text-align: center;
  font-size: 18px;
  display: grid;
  font-weight: ${(props) => (props.header ? "700" : "400")};
  grid-template-columns: ${(props) => (props.header ? "" : "6fr 4fr")};
  padding: 0;
  width: 100%;
  border-bottom: ${(props) =>
    props.header
      ? `2px solid ${palette.primary.black}`
      : `1px solid ${palette.primary.black}`};

  &.noBorderBottom {
    border-bottom: none;
  }

  &.borderTop {
    border-top: 1px solid ${palette.primary.black};
  }
  /* &:not(:first-child) {
    border-left: 1px solid ${palette.primary.black};
  } */
  /* &.noneBorderLeft {
    border-left: none;
  } */
  /* &.secondRow {
    border-bottom: 2px solid ${palette.primary.black};
  } */
`;
const Section = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Title = styled.div`
  background-color: #d9d9d9;
  padding: 16px;
  border-right: 1px solid #000;
  font-weight: 600;
  font-size: 20px;
`;

const Content = styled.div`
  background-color: #fff;
  padding: 16px;
  width: 100%;
  font-weight: 600;
  font-size: 20px;
`;
const StyledInput = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-right: ${(props) => (props.title ? "1px solid #000" : "none")};
  outline: none;
  font-size: 20px;
  background-color: ${(props) => (props.title ? " #d9d9d9" : "#fff")};
  height: 50px;
`;

const PayList = styled.select`
  width: 200px;
  height: 35px;
  margin-right: 10px;
  border: 2px solid ${palette.gray.border};
  border-radius: 5px;
`;

const ListBox = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  align-items: center;
  left: 10px;
  &.buttonBox {
    left: 90%;
  }
`;
