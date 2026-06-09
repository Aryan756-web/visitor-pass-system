import { useState, useEffect } from "react";
import axios from "axios";

function Visitor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [visitors, setVisitors] = useState([]);

  const token = localStorage.getItem("token");

  const exportCSV = () => {
    let csv = "Name,Email\n";

    visitors.forEach((visitor) => {
      csv += `${visitor.name},${visitor.email}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "visitors.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const fetchVisitors = async () => {
    try {
      const res = await axios.get("https://visitor-pass-system-2.onrender.com/api/visitors", {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        "https://visitor-pass-system-2.onrender.com/api/visitors",
        { name, email },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
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
      await axios.delete(`https://visitor-pass-system-2.onrender.com/api/visitors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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

      <button onClick={exportCSV}>Export CSV</button>

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
                <button onClick={() => deleteVisitor(v._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Visitor;
