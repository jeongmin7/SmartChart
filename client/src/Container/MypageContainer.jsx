import React, { useEffect, useState } from "react";
import { userInfoAtom } from "../stores/userInfo";
import axios from "axios";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import MypageComponent from "../components/MypageComponent";

const MypageContainer = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [appointmentList, setAppointmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/patient/page-view", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const appointmentList = response.data.myPageList;
        const latestAppointments = appointmentList.sort(
          (a, b) => new Date(b.reservationDate) - new Date(a.reservationDate)
        );
        setUserInfo(response.data.myPage[0]);
        setAppointmentList(latestAppointments);
        setIsLoading(false);
      } catch (err) {
        toast.error("에러 발생");
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const cancelReservation = async (id) => {
    setIsLoading(true);
    const reservationId = String(id);
    try {
      await axios.delete("/patient/page-cancel", {
        data: { reservationId: reservationId },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const updatedAppointmentList = appointmentList.filter(
        (item) => item.id !== id
      );
      setAppointmentList(updatedAppointmentList);
      toast.success("예약이 취소되었습니다.");
      setIsLoading(false);
    } catch (err) {
      toast.error("예약 취소 중 오류가 발생했습니다.");
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };
  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await axios.patch("/patient/page", {
        name: userInfo.name,
        gender: userInfo.gender,
        age: 10,
        phoneNumber: userInfo.phoneNumber,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("저장되었습니다.");
      setIsLoading(false);
    } catch (error) {
      toast.error("관리자에게 문의해주세요");
      setIsLoading(false);
    }
  };
  return (
    <MypageComponent
      userInfo={userInfo}
      appointmentList={appointmentList}
      isLoading={isLoading}
      handleChange={handleChange}
      handleUpdate={handleUpdate}
      cancelReservation={cancelReservation}
    />
  );
};

export default MypageContainer;
