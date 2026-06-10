import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    visitors: 0,
    appointments: 0,
    passes: 0,
    checkins: 0,
  });

  const token = localStorage.getItem("token");

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "https://visitor-pass-system-2.onrender.com/api/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            minWidth: "180px",
          }}
        >
          <h3>Visitors</h3>
          <p>{stats.visitors}</p>
        </div>

        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            minWidth: "180px",
          }}
        >
          <h3>Appointments</h3>
          <p>{stats.appointments}</p>
        </div>

        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            minWidth: "180px",
          }}
        >
          <h3>Passes</h3>
          <p>{stats.passes}</p>
        </div>

        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            minWidth: "180px",
          }}
        >
          <h3>Check Ins</h3>
          <p>{stats.checkins}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
