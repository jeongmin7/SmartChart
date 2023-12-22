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
  const [isKakaoPayOpen, setIsKakaoPayOpen] = useState(false);

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
  }, [isKakaoPayOpen]);

  const requestPayment = async (options) => {
    const IMP = window.IMP;
    IMP.init("imp18267031");

    return new Promise((resolve, reject) => {
      IMP.request_pay(options, (rsp) => {
        if (rsp.success) {
          resolve(rsp);
        } else {
          reject(new Error("결제 실패"));
        }
      });
    });
  };

  const handlePayment = async (id) => {
    setIsKakaoPayOpen(true);
    try {
      const response = await axios.post(
        "/patient/cost",
        { reservationId: id },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setPatient(response.data.data[0]);
      setTotal(response.data.date3[0].sum);
      setId(id);
      await kakaoPay();
      setIsKakaoPayOpen(false);
    } catch (error) {
      toast.error("정보를 가져오는데 실패했습니다.");
    }
  };

  const kakaoPay = async () => {
    const IMP = window.IMP;
    IMP.init("imp18267031");

    try {
      const rsp = await requestPayment({
        pg: "kakaopay.TC0ONETIME",
        pay_method: "kakaopay",
        merchant_uid: "patient_" + new Date().getTime(),
        name: "병원비 내기",
        amount: total,
        reservationId: id,
        hospital_name: patient.hospitalName,
        patient_name: patient.name,
      });

      const data = {
        imp_uid: rsp.imp_uid,
        amount: rsp.paid_amount,
        reservationId: id,
      };

      const response = await fetch("/patient/vertifyIamport", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        toast.success("결제 및 결제 검증이 완료되었습니다.");
      } else {
        toast.error("결제에 실패했습니다.");
      }
      setIsKakaoPayOpen(false);
    } catch (error) {
      toast.error("결제 중 문제 발생");
      // 실패 시 특정 동작 수행
    }
  };

  useEffect(() => {
    // total이 들어왔고, patient 객체있어야 카카오로 요청
    if (total > 0 && Object.keys(patient).length > 0) {
      kakaoPay();
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
