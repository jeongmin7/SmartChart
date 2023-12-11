import React, { useEffect, useState } from "react";
import AppointmentComponent from "../components/AppointmentComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { dateAtom, selectedOptionState } from "../stores/dateAtom";
import axios from "axios";
import { toast } from "react-toastify";

const availableTimes = [
  "09:00:00",
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
];
const AppointmentContainer = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [info, setInfo] = useState({});
  const [checkAvailablity, setCheckAvailablity] = useState(false);
  const selectedDate = useRecoilValue(dateAtom);
  const selectedTime = useRecoilValue(selectedOptionState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/patient/reservation-view/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          withCredentials: true,
        });
        setInfo(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const checkAvaliablity = () => {
    const data = {
      reservationDate: selectedDate,
      reservationTime: selectedTime,
    };
    setIsLoading(true);
    try {
      const response = axios.post("/patient/check-reservation", data);
      setCheckAvailablity(true);
      toast.success("예약 가능한 시간입니다.");
      setIsLoading(false);
    } catch (error) {
      toast.error("예약불가능한 시간입니다.");
      setIsLoading(false);
    }
  };
  const handleSave = () => {
    setIsLoading(true);
    try {
      axios
        .post(`/patient/reservation`, {
          doctorId: info.doctorId,
          reservationDate: selectedDate,
          reservationTime: selectedTime,
        })
        .then(toast.success("예약되었습니다."), navigate("/selfdiagnosis"));
      setIsLoading(false);
    } catch (error) {
      toast.error("예약이 되지 않았습니다.");
      setIsLoading(false);
    }
  };
  return (
    <AppointmentComponent
      info={info}
      isLoading={isLoading}
      checkAvailablity={checkAvailablity}
      selectedTime={selectedTime}
      availableTimes={availableTimes}
      selectedDate={selectedDate}
      checkAvaliablity={checkAvaliablity}
      handleSave={handleSave}
    />
  );
};

export default AppointmentContainer;
