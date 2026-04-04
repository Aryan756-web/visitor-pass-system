import { useState, useEffect } from "react";
import axios from "axios";

function Visitor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [visitors, setVisitors] = useState([]);

  const addVisitor = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/visitors",
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Visitor added");
      fetchVisitors(); 

    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Error adding visitor");
    }
  };

const fetchVisitors = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://visitor-pass-system-e29h.onrender.com/api/visitors",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("VISITORS:", res.data);
    setVisitors(res.data);

  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

useEffect(() => {
  fetchVisitors();
}, []);

  return (
    <div>
      <h2>Add Visitor</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

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
