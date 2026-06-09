import { useState, useEffect } from "react";
import axios from "axios";

function Appointment() {
  const [visitors, setVisitors] = useState([]);
  const [visitorId, setVisitorId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const token = localStorage.getItem("token");

  const fetchVisitors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/visitors",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setVisitors(res.data);
    } catch (err) {
      console.log("error");
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/appointments",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setAppointments(res.data.appointments || res.data);
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchVisitors();
    fetchAppointments();
  }, []);

  const createAppointment = async () => {
    if (!visitorId || !date) {
      alert("select visitor and date");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/appointments",
        { visitor: visitorId, date },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setDate("");
      setVisitorId("");
      fetchAppointments();
    } catch (err) {
      alert("error");
    }
  };

  const approveAppointment = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/appointments/${id}/approve`,
        { status: "approved" },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      fetchAppointments();
    } catch (err) {
      alert("error");
    }
  };

  // filter logic
  const filteredAppointments = appointments.filter((a) => {
    const name = a.visitor?.name?.toLowerCase() || "";

    const matchSearch = name.includes(search.toLowerCase());

    const matchStatus = statusFilter === "all" || a.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const generatePass = async (appointmentId) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/pass",
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert("Pass generated");

      // store pass id inside appointment temporarily
      fetchAppointments();
    } catch (err) {
      alert("error generating pass");
    }
  };

  const downloadPDF = async (passId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/pass/pdf/${passId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "visitor_pass.pdf");

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("error downloading pdf");
    }
  };

  return (
    <div>
      <h2>Create Appointment</h2>

      <select value={visitorId} onChange={(e) => setVisitorId(e.target.value)}>
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

      <h2>Dashboard</h2>

      <input
        placeholder="search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
      </select>

      <table border="1" cellPadding="8" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredAppointments.map((a) => (
            <tr key={a._id}>
              <td>{a.visitor?.name}</td>
              <td>{new Date(a.date).toLocaleString()}</td>
              <td>{a.status}</td>
              <td>
                {a.status !== "approved" && (
                  <button onClick={() => approveAppointment(a._id)}>
                    Approve
                  </button>
                )}

                {a.status === "approved" && (
                  <button onClick={() => generatePass(a._id)}>
                    Generate Pass
                  </button>
                )}

                {a.pass && (
                  <button onClick={() => downloadPDF(a.pass)}>
                    Download PDF
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointment;
