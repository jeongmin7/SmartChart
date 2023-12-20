import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminWaitingListComponent from "../components/AdminWaitingListComponent";

const AdminWaitingListContainer = () => {
  const [appointment, setAppointment] = useState([]);
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = String(currentTime.getMonth() + 1).padStart(2, "0");
  const day = String(currentTime.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;
  const [tasks, setTasks] = useState({
    대기중: [],
    진료중: [],
    완료: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/doctor/waiting-list-view", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const fetchedAppointments = response.data.data;

        const sortedAppointments = [...fetchedAppointments].sort(
          compareAppointments
        );

        setAppointment(sortedAppointments);

        const updatedTasks = {
          대기중: sortedAppointments.filter(
            (appt) => appt.waitingStatus === "대기중"
          ),
          진료중: sortedAppointments.filter(
            (appt) => appt.waitingStatus === "진료중"
          ),
          완료: sortedAppointments.filter((appt) => !appt.waitingStatus),
        };

        setTasks(updatedTasks);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  function compareAppointments(appointment1, appointment2) {
    const date1 = new Date(`${appointment1.reservationTime}`);
    const date2 = new Date(`${appointment2.reservationTime}`);

    return date1 - date2;
  }
  const handleDragStart = (e, appointment, status) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ appointment, status })
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetStatus) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const { appointment, status } = JSON.parse(data);

    if (status !== targetStatus) {
      const existingAppointmentIndex = tasks[status].findIndex(
        (apt) => apt.id === appointment.id
      );

      if (existingAppointmentIndex !== -1) {
        // 변경된 waiting상태를 적용
        appointment.waitingStatus = targetStatus;

        const updatedTasks = {
          ...tasks,
          [status]: tasks[status].filter((apt) => apt.id !== appointment.id),
          [targetStatus]: [
            ...tasks[targetStatus].filter((apt) => apt.id !== appointment.id),
            appointment,
          ],
        };

        try {
          await axios.patch("/doctor/waiting-list-status", {
            reservationId: appointment.id,
            waitingStatus: targetStatus,
          });

          setTasks(updatedTasks);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <AdminWaitingListComponent
      today={today}
      isLoading={isLoading}
      tasks={tasks}
      handleDragStart={handleDragStart}
      handleDragOver={handleDragOver}
      handleDrop={handleDrop}
    />
  );
};

export default AdminWaitingListContainer;
