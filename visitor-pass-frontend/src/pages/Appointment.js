import { useState, useEffect } from "react";
import axios from "axios";

function Appointment() {
  const [visitors, setVisitors] = useState([]);
  const [visitorId, setVisitorId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("");

  const token = localStorage.getItem("token");

  // GET VISITORS
  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await axios.get("https://visitor-pass-system-e29h.onrender.com/api/visitors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVisitors(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVisitors();
  }, [token]);

  // CREATE APPOINTMENT
  const createAppointment = async () => {
    try {
      await axios.post(
        "https://visitor-pass-system-e29h.onrender.com/api/appointments",
        {
          visitor: visitorId,
          date: date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Appointment created");
    } catch (error) {
      console.log(error.response?.data || error.message);
      console.log("FULL ERROR:", error);
      console.log("BACKEND ERROR:", error.response?.data);

      alert(error.response?.data?.message || "Error creating appointment");
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "https://visitor-pass-system-e29h.onrender.com/api/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setAppointments(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
  }, [token]);

  const approveAppointment = async (id) => {
    try {
      await axios.put(
        `https://visitor-pass-system-e29h.onrender.com/api/appointments/${id}/approve`,
        { status: "approved" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Approved");

      // refresh list
      window.location.reload();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Error approving");
    }
  };

  return (
    <div>
      <h2>Create Appointment</h2>

      <select onChange={(e) => setVisitorId(e.target.value)}>
        <option>Select Visitor</option>
        {visitors.map((v) => (
          <option key={v._id} value={v._id}>
            {v.name}
          </option>
        ))}
      </select>

      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={createAppointment}>Create</button>

      <h3>Appointments</h3>

      <ul>
        {appointments.map((a) => (
          <li key={a._id}>
            {a.visitor?.name} - {new Date(a.date).toLocaleString()} - {a.status}
            {a.status !== "approved" && (
              <button onClick={() => approveAppointment(a._id)}>Approve</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointment;
