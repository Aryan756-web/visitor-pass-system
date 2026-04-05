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
        const res = await axios.get(
          "https://visitor-pass-system-e29h.onrender.com/api/visitors",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setVisitors(res.data);
      } catch (error) {
        console.log("Error fetching visitors");
      }
    };

    fetchVisitors();
  }, [token]);

  // CREATE APPOINTMENT
  const createAppointment = async () => {
    if (!visitorId || !date) {
      alert("Please select visitor and date");
      return;
    }

    try {
      await axios.post(
        "https://visitor-pass-system-e29h.onrender.com/api/appointments",
        {
          visitor: visitorId,
          date,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Appointment created");
      fetchAppointments(); // refresh
    } catch (error) {
      alert(error.response?.data?.message || "Error creating appointment");
    }
  };

  // GET APPOINTMENTS
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "https://visitor-pass-system-e29h.onrender.com/api/appointments",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAppointments(res.data);
    } catch (error) {
      console.log("Error fetching appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [token]);

  // APPROVE
  const approveAppointment = async (id) => {
    try {
      await axios.put(
        `https://visitor-pass-system-e29h.onrender.com/api/appointments/${id}/approve`,
        { status: "approved" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Approved");
      fetchAppointments(); // no reload
    } catch (error) {
      alert("Error approving");
    }
  };

  return (
    <div>
      <h2>Create Appointment</h2>

      <select onChange={(e) => setVisitorId(e.target.value)}>
        <option value="">Select Visitor</option>
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
            {a.visitor?.name} -{" "}
            {new Date(a.date).toLocaleString()} - {a.status}

            {a.status !== "approved" && (
              <button onClick={() => approveAppointment(a._id)}>
                Approve
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointment;