import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PayComponent from "../components/PayComponent";

const PayContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [patient, setPatient] = useState({});
  const [total, setTotal] = useState(0);
  const [id, setId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleModal = (itemId) => {
    setSelectedItemId(itemId);
    setIsModalOpen(!isModalOpen);
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/patient/cost-view", {});
      setList(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePayment = async (id) => {
    console.log(id);
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
      setId(id);
      kakaoPay();
    } catch (error) {
      toast.error("정보를 가져오는데 실패했습니다.");
    }
  };
  const kakaoPay = () => {
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
          alert("결제 실패1");
        }
      }
    );
  };
  useEffect(() => {
    // total이 들어왔고, patient 객체있어야 카카오로 요청
    if (total > 0 && patient && Object.keys(patient).length > 0) {
      kakaoPay(id, total, patient);
    }
  }, [total, patient]);

  return (
    <PayComponent
      list={list}
      handleModal={handleModal}
      handlePayment={handlePayment}
      isLoading={isLoading}
      selectedItemId={selectedItemId}
      isModalOpen={isModalOpen}
    />
  );
};

export default PayContainer;
