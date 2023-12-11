import React, { useState, useEffect } from "react";
import AdminAppointmentComponent from "../components/AdminAppointmentComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminAppointmentContainer = () => {
  const navigate = useNavigate();
  const [searchUsername, setSearchUsername] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [isSMSModalOpen, setIsSMSModalOpen] = useState(false);
  const [SMSInfo, setSMSInfo] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [appointmentModals, setAppointmentModals] = useState(
    appointments.map(() => false)
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/doctor/reservation-view", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setAppointments(response.data.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("데이터를 읽어오는데 실패했습니다.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUsernameChange = (event) => {
    setSearchUsername(event.target.value);
    filterAppointments(event.target.value, searchDate);
  };

  const handleDateChange = (event) => {
    setSearchDate(event.target.value);
    filterAppointments(searchUsername, event.target.value);
  };
  const filterAppointments = (username, date) => {
    const filtered = appointments.filter((appointment) => {
      const nameMatch = username ? appointment.name.includes(username) : true;
      const dateMatch = date
        ? appointment.reservationDate.includes(date)
        : true;
      return nameMatch && dateMatch;
    });

    setFilteredAppointments(filtered);
  };

  const handleClickBillingButton = (appointment) => {
    navigate(`/billing?id=${appointment.id}`, {
      state: appointment,
    });
  };

  const handleModal = (index) => {
    const updatedModals = [...appointmentModals];
    updatedModals[index] = !updatedModals[index];
    setAppointmentModals(updatedModals);
  };

  const handleSMSModal = ({ appointment } = {}) => {
    setIsSMSModalOpen(!isSMSModalOpen);
    setSMSInfo(appointment);
  };

  useEffect(() => {
    filterAppointments(searchUsername, searchDate);
  }, [searchUsername, searchDate, appointments]);

  return (
    <AdminAppointmentComponent
      searchUsername={searchUsername}
      searchDate={searchDate}
      filteredAppointments={filteredAppointments}
      isSMSModalOpen={isSMSModalOpen}
      SMSInfo={SMSInfo}
      appointments={appointments}
      appointmentModals={appointmentModals}
      isLoading={isLoading}
      handleUsernameChange={handleUsernameChange}
      handleDateChange={handleDateChange}
      handleClickBillingButton={handleClickBillingButton}
      handleModal={handleModal}
      handleSMSModal={handleSMSModal}
    />
  );
};

export default AdminAppointmentContainer;
