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
        "http://localhost:5000/api/visitors",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setVisitors(res.data);
    } catch (error) {
      console.log("error");
    }
  };

  const addVisitor = async () => {
    if (!name || !email) {
      alert("enter details");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/visitors",
        { name, email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setName("");
      setEmail("");
      fetchVisitors();
    } catch (error) {
      alert("error");
    }
  };

  const deleteVisitor = async (id) => {
    if (!window.confirm("delete this visitor?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/visitors/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchVisitors();
    } catch (error) {
      alert(error.response?.data?.message || "error deleting");
console.log(error.response);
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

      <h3>Visitors</h3>

      <table border="1" cellPadding="8" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {visitors.map((v) => (
            <tr key={v._id}>
              <td>{v.name}</td>
              <td>{v.email}</td>
              <td>
                <button onClick={() => deleteVisitor(v._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Visitor;