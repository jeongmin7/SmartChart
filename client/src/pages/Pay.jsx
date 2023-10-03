import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "../styles/GlobalStyles";
import Button from "../components/Button";
import Modal from "../components/Modal";
import BillingComponent from "../components/BillingComponent";

const Pay = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const columns = [
    { name: "", width: "3%" },
    { name: "예약번호", width: "8%" },
    { name: "병원명", width: "13%" },
    { name: "진료날짜", width: "13%" },
    { name: "환자 성명", width: "12%" },
    { name: "총 금액", width: "13%" },
    { name: "진료비 납부상태", width: "13%" },
    { name: "진료비 보기", width: "13%" },
    { name: "진료비 내기", width: "13%" },
  ];

  const handlePayment = () => {
    const IMP = window.IMP;
    IMP.init("imp18267031");

    IMP.request_pay(
      {
        pg: "kakaopay.TC0ONETIME",
        pay_method: "kakaopay",
        merchant_uid: "patient_" + new Date().getTime(),
        name: "병원비 내기",
        amount: 10000,
        reservationId: 32,
        hospital_name: "차앤박 병원",
        patient_name: "watch",
      },
      function (rsp) {
        if (rsp.success) {
          let data = {
            imp_uid: rsp.imp_uid,
            amount: rsp.paid_amount,
            reservationId: 32,
          };

          fetch("/patient/vertifyIamport", {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((result) => {
              alert("결제 및 결제 검증이 완료되었습니다.");
            })
            .catch((error) => {
              alert(error.message);
            });
        } else {
          alert("결제 실패");
        }
      },
    );
  };
  return (
    <Container>
      <Wrapper>
        <Header>진료비</Header>
        <List>
          <AppointmentListTitle>
            {columns.map((column, index) => (
              <ListRowDivideWrapper width={column.width} index={index}>
                {column.name}
              </ListRowDivideWrapper>
            ))}
          </AppointmentListTitle>
          <AppointmentListBody>
            {columns.map((column, index) => (
              <ListRowDivideWrapper width={column.width} index={index}>
                {index === 0 ? (
                  String(index + 1)
                ) : index === 1 ? (
                  <div>31</div>
                ) : index === 2 ? (
                  <div>차앤박 피부과</div>
                ) : index === 3 ? (
                  <div>진료 날짜 </div>
                ) : index === 4 ? (
                  <div> 이OO </div>
                ) : index === 5 ? (
                  <div>110000원</div>
                ) : index === 6 ? (
                  <div>미납</div>
                ) : index === 7 ? (
                  <Button
                    width="80px"
                    fontSize="12px"
                    padding="5px"
                    borderRadius="7px"
                    onClick={handleModal}
                  >
                    진료비 보기
                  </Button>
                ) : index === 8 ? (
                  <Button
                    width="80px"
                    fontSize="12px"
                    padding="5px"
                    borderRadius="7px"
                    onClick={handlePayment}
                  >
                    진료비 내기
                  </Button>
                ) : (
                  column.name
                )}
              </ListRowDivideWrapper>
            ))}
            <Modal isOpen={isModalOpen} handleModal={handleModal}>
              <BillingComponent />
            </Modal>
          </AppointmentListBody>
        </List>
      </Wrapper>
    </Container>
  );
};

export default Pay;
const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 1300px;
  min-height: calc(100vh - 65px);
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 950px;
  min-height: 700px;
  padding: 100px 0;
`;
const Header = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 25px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: auto;
  margin: 30px 0;
`;

const AppointmentListTitle = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  background-color: ${palette.gray.light};
  border-top: 1px solid ${palette.gray.border};
  border-bottom: 1px solid ${palette.gray.border};
  padding: 5px;
`;
const AppointmentListBody = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  border-bottom: 1px solid ${palette.gray.border};
  padding: 5px;
`;

const ListRowDivideWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    (props.index === 0 || props.index === 5 || props.index === 6) && "center"};
  width: ${(props) => (props.width ? props.width : "100%")};
  height: 100%;
  font-weight: bold;
  font-size: 16px;
  border-left: ${(props) =>
    props.index !== 0 && `1px solid ${palette.gray.border}`};
  padding-left: ${(props) =>
    props.index !== 0 && props.index !== 5 && props.index !== 6 && "10px"};
`;
