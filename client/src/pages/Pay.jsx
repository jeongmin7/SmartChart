import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { palette } from "../styles/GlobalStyles";
import Button from "../components/Button";
import Modal from "../components/Modal";
import PatientBill from "../components/PatientBill";
import axios from "axios";
import { Container, Header, Wrapper } from "../styles/CommonStyle";
import { toast } from "react-toastify";

const Pay = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [patient, setPatient] = useState({});
  const [total, setTotal] = useState(0);

  const handleModal = (itemId) => {
    setSelectedItemId(itemId);
    setIsModalOpen(!isModalOpen);
  };
  console.log(list);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/patient/cost-view", {});

        setList(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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

  const handlePayment = async (id) => {
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
      setPatient(response.data.data[0]);
      setTotal(response.data.date3[0].sum);
    } catch (error) {
      toast.error("정보를 가져오는데 실패했습니다.");
    }
    const IMP = window.IMP;
    IMP.init("imp18267031");

    IMP.request_pay(
      {
        pg: "kakaopay.TC0ONETIME",
        pay_method: "kakaopay",
        merchant_uid: "patient_" + new Date().getTime(),
        name: "병원비 내기",
        amount: total,
        reservationId: id,
        hospital_name: patient.hospitalName,
        patient_name: patient.name,
      },

      function (rsp) {
        if (rsp.success) {
          let data = {
            imp_uid: rsp.imp_uid,
            amount: rsp.paid_amount,
            reservationId: id,
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
      }
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
            {list.map((item, itemIndex) => (
              <ListWrapper key={itemIndex}>
                {columns.map((column, index) => (
                  <ListRowDivideWrapper
                    width={column.width}
                    index={index}
                    key={index}
                  >
                    {index === 0 ? (
                      String(itemIndex + 1)
                    ) : index === 1 ? (
                      <div>{item.id}</div>
                    ) : index === 2 ? (
                      <div>{item.hospitalName}</div>
                    ) : index === 3 ? (
                      <div>{item.reservationDate}</div>
                    ) : index === 4 ? (
                      <div>{item.name}</div>
                    ) : index === 5 ? (
                      <div>{item.sum}원</div>
                    ) : index === 6 ? (
                      <div>{item.patientPaymentStatus}</div>
                    ) : index === 7 ? (
                      <Button
                        width="80px"
                        fontSize="12px"
                        padding="5px"
                        borderRadius="7px"
                        onClick={() => handleModal(item.id)}
                      >
                        진료비 보기
                      </Button>
                    ) : index === 8 ? (
                      <Button
                        width="80px"
                        fontSize="12px"
                        padding="5px"
                        borderRadius="7px"
                        onClick={() => handlePayment(item.id)}
                      >
                        진료비 내기
                      </Button>
                    ) : (
                      column.name
                    )}
                  </ListRowDivideWrapper>
                ))}
              </ListWrapper>
            ))}
            <Modal isOpen={isModalOpen} handleModal={handleModal}>
              <PatientBill id={selectedItemId} />
            </Modal>
          </AppointmentListBody>
        </List>
      </Wrapper>
    </Container>
  );
};

export default Pay;

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
  flex-direction: column;
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

const ListWrapper = styled.div`
  display: flex;
  margin: 5px 0px;
`;
