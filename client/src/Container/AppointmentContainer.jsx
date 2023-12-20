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
  const [isAppointmentPossible, setIsAppointmentPossible] = useState(true);

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

  const checkAvaliablity = async () => {
    const data = {
      doctorId: Number(id),
      reservationDate: new Date(selectedDate).toISOString().split("T")[0],
      reservationTime: selectedTime,
    };

    setIsLoading(true);

    const response = await axios.post("/patient/check-reservation", data);
    setCheckAvailablity(true);
    if (response.data.code === 200) {
      toast.success(response.data.message);

      setIsAppointmentPossible(true);
      setIsLoading(false);
    } else if (response.data.code === 409) {
      toast.error(response.data.message);
      setIsAppointmentPossible(false);
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
      isAppointmentPossible={isAppointmentPossible}
    />
  );
};

export default AppointmentContainer;
