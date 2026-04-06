import { useState, useEffect } from "react";
import axios from "axios";

function Visitor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [visitors, setVisitors] = useState([]);

  const token = localStorage.getItem("token");

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

  const addVisitor = async () => {
    if (!name || !email) {
      alert("Name and email required");
      return;
    }

    try {
      await axios.post(
        "https://visitor-pass-system-e29h.onrender.com/api/visitors",
        { name, email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Visitor added");
      setName("");
      setEmail("");
      fetchVisitors();
    } catch (error) {
      alert(error.response?.data?.message || "Error adding visitor");
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <div>
      <h2>Add Visitor</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={addVisitor}>Add Visitor</button>

      <ul>
        {visitors.map((v) => (
          <li key={v._id}>
            {v.name} - {v.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Visitor;