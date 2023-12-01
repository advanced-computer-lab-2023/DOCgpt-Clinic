import React, { useState, useEffect } from "react";
import axios from "axios";

const TodayAppointmentsComponent: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/routes/doctors/todayapp", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching today appointments:", error);
      }
    };

    fetchData();
  }, []);
  const handleStartMeeting = () => {
    window.open("https://zoom.us/s/83812339297#success", "_blank");
  };

  return (
    <div>
      <h1>Today's Appointments</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            {appointment.patient} - {appointment.date}
            <button onClick={() => handleStartMeeting()}>Start Meeting</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodayAppointmentsComponent;
